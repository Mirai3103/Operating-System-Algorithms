import { GanntChart, ProcessTaskQueue, Queue, Task, TaskStatus, TaskType } from "./CPUSchedulingTypes";

class FCFSSolution {
    public processTaskList: ProcessTaskQueue[] = [];
    public waitCpuQueue: Queue<Task> = new Queue<Task>();
    public waitIO1Queue: Queue<Task> = new Queue<Task>();
    public waitIO2Queue: Queue<Task> = new Queue<Task>();
    public waitIO3Queue: Queue<Task> = new Queue<Task>();
    constructor(processTaskList: ProcessTaskQueue[]) {
        this.processTaskList = processTaskList;
    }
    public run() {
        let time = 0;
        const ganntChart = new GanntChart();
        while (true) {
            // check if any process has arrived CPU
            for (let i = 0; i < this.processTaskList.length; i++) {
                const processTask = this.processTaskList[i];
                if (processTask.arrivalTime === time) {
                    this.pushTaskToQueue(processTask.taskQueue.dequeue()!);
                }
            }
            if (
                this.waitCpuQueue.isEmpty() &&
                this.waitIO1Queue.isEmpty() &&
                this.waitIO2Queue.isEmpty() &&
                this.waitIO3Queue.isEmpty()
            ) {
                break;
            } else {
                const recentAddedTask: any = {};
                ganntChart.addTask(this.waitCpuQueue.peek(), TaskType.CPU);
                ganntChart.addTask(this.waitIO1Queue.peek(), TaskType.IO1);
                ganntChart.addTask(this.waitIO2Queue.peek(), TaskType.IO2);
                ganntChart.addTask(this.waitIO3Queue.peek(), TaskType.IO3);
                this.handleCPUTask(recentAddedTask, time);
                if (!this.waitIO1Queue.isEmpty() && !recentAddedTask[this.waitIO1Queue.peek()?.belongTo!]) {
                    console.log(
                        `Time: ${time}  -  process: ${this.waitIO1Queue.peek()?.belongTo} - task: ${
                            TaskType[this.waitIO1Queue.peek()?.type!]
                        }`
                    );
                    let task = this.waitIO1Queue.peek()!;

                    task.descreaseTime();
                    if (task.timeRemaining === 0) {
                        // remove from queue
                        this.waitIO1Queue.dequeue();
                        const processTask = this.processTaskList.filter((p) => p.processName === task.belongTo)[0];
                        if (processTask.taskQueue.isEmpty()) {
                            // process finished
                            console.log(`${task.belongTo} finished at ${time + 1}`);
                        } else {
                            this.pushTaskToQueue(processTask.taskQueue.dequeue()!);
                        }
                    }
                }
                if (!this.waitIO2Queue.isEmpty() && !recentAddedTask[this.waitIO2Queue.peek()?.belongTo!]) {
                    console.log(
                        `Time: ${time}  -  process: ${this.waitIO2Queue.peek()?.belongTo} - task: ${
                            TaskType[this.waitIO2Queue.peek()?.type!]
                        }`
                    );
                    let task = this.waitIO2Queue.peek()!;
                    task.descreaseTime();
                    if (task.timeRemaining === 0) {
                        // remove from queue
                        this.waitIO2Queue.dequeue();
                        const processTask = this.processTaskList.filter((p) => p.processName === task.belongTo)[0];
                        if (processTask.taskQueue.isEmpty()) {
                            // process finished
                            console.log(`${task.belongTo} finished at ${time + 1}`);
                        } else {
                            this.pushTaskToQueue(processTask.taskQueue.dequeue()!);
                        }
                    }
                }
                if (!this.waitIO3Queue.isEmpty() && !recentAddedTask[this.waitIO3Queue.peek()?.belongTo!]) {
                    console.log(
                        `Time: ${time}  -  process: ${this.waitIO3Queue.peek()?.belongTo} - task: ${
                            TaskType[this.waitIO3Queue.peek()?.type!]
                        }`
                    );
                    let task = this.waitIO3Queue.peek()!;
                    task.descreaseTime();
                    if (task.timeRemaining === 0) {
                        // remove from queue
                        this.waitIO3Queue.dequeue();
                        const processTask = this.processTaskList.filter((p) => p.processName === task.belongTo)[0];
                        if (processTask.taskQueue.isEmpty()) {
                            // process finished
                            console.log(`${task.belongTo} finished at ${time + 1}`);
                        } else {
                            this.pushTaskToQueue(processTask.taskQueue.dequeue()!);
                        }
                    }
                }
            }
            time++;
            if (time > 100) {
                break;
            }
        }
        return ganntChart;
    }
    public handleCPUTask(recentAddedTask: any, time: number) {
        if (!this.waitCpuQueue.isEmpty()) {
            console.log(
                `Time: ${time}  -  process: ${this.waitCpuQueue.peek()?.belongTo} - task: ${
                    TaskType[this.waitCpuQueue.peek()?.type!]
                }`
            );
            let task = this.waitCpuQueue.peek()!;
            task.descreaseTime();
            if (task.status === TaskStatus.Finished) {
                this.waitCpuQueue.dequeue();
                const processTask = this.processTaskList.filter((p) => p.processName === task.belongTo)[0];
                if (processTask.taskQueue.isEmpty()) {
                    console.log(`${task.belongTo} finished at ${time + 1}`);
                } else {
                    const nextTask = processTask.taskQueue.dequeue()!;
                    this.pushTaskToQueue(nextTask);
                    recentAddedTask[nextTask.belongTo] = true;
                }
            }
        }
    }
    public pushTaskToQueue(task: Task) {
        if (task.type === TaskType.CPU) {
            this.waitCpuQueue.enqueue(task);
        }
        if (task.type === TaskType.IO1) {
            this.waitIO1Queue.enqueue(task);
        }
        if (task.type === TaskType.IO2) {
            this.waitIO2Queue.enqueue(task);
        }
        if (task.type === TaskType.IO3) {
            this.waitIO3Queue.enqueue(task);
        }
    }
}
export default FCFSSolution;
