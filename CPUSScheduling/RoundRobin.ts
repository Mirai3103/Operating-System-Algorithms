import { GanntChart, ProcessTaskQueue, Queue, SchedulerType, Task, TaskStatus, TaskType } from "./CPUSchedulingTypes";
import FCFSSolution from "./FirstComeFirstServed";

class RRSolution extends FCFSSolution {
    constructor(processTaskList: ProcessTaskQueue[], public timeQuantum: number) {
        super(processTaskList);
        for (let i = 0; i < processTaskList.length; i++) {
            for (let j = 0; j < processTaskList[i].taskQueue.queue.length; j++) {
                if (processTaskList[i].taskQueue.queue[j].type === TaskType.CPU) {
                    const task = processTaskList[i].taskQueue.queue[j] as Task;
                    if (task.type === TaskType.CPU) {
                        task.timeQuantum = timeQuantum;
                    }
                }
            }
        }
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
                    console.log(`${task.belongTo} finished at ${time}`);
                } else {
                    const nextTask = processTask.taskQueue.dequeue()!;
                    this.pushTaskToQueue(nextTask);
                    recentAddedTask[nextTask.belongTo] = true;
                }
            }
            if (task.status === TaskStatus.EndCycle) {
                // console.log(`${task.belongTo} wait at ${time}`);
                const task1 = this.waitCpuQueue.dequeue();
                task1!.status = TaskStatus.Waiting;
                this.waitCpuQueue.enqueue(task1!);
                // console.log("queue: ", this.waitCpuQueue.toString());
            }
        }
    }
}

export default RRSolution;
