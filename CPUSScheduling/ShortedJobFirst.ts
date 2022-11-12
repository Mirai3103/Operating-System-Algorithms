import { GanntChart, ProcessTaskQueue, Queue, SchedulerType, Task, TaskStatus, TaskType } from "./CPUSchedulingTypes";
import FCFSSolution from "./FirstComeFirstServed";
export default class SJFSolution extends FCFSSolution {
    public pushTaskToQueue(task: Task) {
        if (task.type === TaskType.CPU) {
            this.waitCpuQueue.enqueue(task);

            if (this.waitCpuQueue.peek()?.status === TaskStatus.Running) {
                for (let i = 1; i < this.waitCpuQueue.queue.length; i++) {
                    for (let j = i + 1; j < this.waitCpuQueue.queue.length; j++) {
                        if (this.waitCpuQueue.queue[i].timeRemaining > this.waitCpuQueue.queue[j].timeRemaining) {
                            const temp = this.waitCpuQueue.queue[i];
                            this.waitCpuQueue.queue[i] = this.waitCpuQueue.queue[j];
                            this.waitCpuQueue.queue[j] = temp;
                        }
                    }
                }
            } else {
                this.waitCpuQueue.queue.sort((a, b) => a.timeRemaining - b.timeRemaining);
            }
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
