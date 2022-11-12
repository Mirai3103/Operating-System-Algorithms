import { GanntChart, ProcessTaskQueue, Queue, SchedulerType, Task, TaskStatus, TaskType } from "./CPUSchedulingTypes";
import FCFSSolution from "./FirstComeFirstServed";
export default class SRTFSolution extends FCFSSolution {
    public pushTaskToQueue(task: Task) {
        if (task.type === TaskType.CPU) {
            this.waitCpuQueue.enqueue(task);
            this.waitCpuQueue.queue.sort((a, b) => a.timeRemaining - b.timeRemaining);
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
