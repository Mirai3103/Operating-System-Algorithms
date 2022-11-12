export enum TaskType {
    CPU,
    IO1,
    IO2,
    IO3,
}
export enum SchedulerType {
    FCFS,
    SJF,
    SRTF,
    RR,
}
export class GanntChart {
    public CPUHistory: (Task | undefined)[] = [];
    public IO1History: (Task | undefined)[] = [];
    public IO2History: (Task | undefined)[] = [];
    public IO3History: (Task | undefined)[] = [];

    public addTask(task: Task | undefined, taskType: TaskType) {
        switch (taskType) {
            case TaskType.CPU:
                this.CPUHistory.push(task);
                break;
            case TaskType.IO1:
                this.IO1History.push(task);
                break;
            case TaskType.IO2:
                this.IO2History.push(task);
                break;
            case TaskType.IO3:
                this.IO3History.push(task);
                break;
        }
    }
}
export enum TaskStatus {
    Running = 0,
    Waiting = 1,
    Finished = 2,
    EndCycle = 3,
}
export class Task {
    public belongTo: string = "";
    public status: TaskStatus = TaskStatus.Waiting;
    public timeQuantum: number = 0;
    public timeExcuteCount: number = 0;
    constructor(public type: TaskType, public timeRemaining: number) {}
    public descreaseTime() {
        this.status = TaskStatus.Running;
        this.timeRemaining--;
        this.timeExcuteCount++;
        if (this.timeExcuteCount === this.timeQuantum) {
            this.status = TaskStatus.EndCycle;
            this.timeExcuteCount = 0;
        }
        if (this.timeRemaining === 0) {
            this.status = TaskStatus.Finished;
        }
    }
    public toString() {
        return `Task ${TaskType[this.type]} ${this.timeRemaining} ${this.belongTo}`;
    }
}

export class Queue<T> {
    public queue: T[] = [];

    public enqueue(item: T) {
        this.queue.push(item);
    }

    public dequeue() {
        return this.queue.shift();
    }

    public get length() {
        return this.queue.length;
    }

    public isEmpty() {
        return this.length === 0;
    }

    public peek() {
        return !this.isEmpty() ? this.queue[0] : undefined;
    }
    public toString() {
        return this.queue.map((item) => (item as any).toString()).join(", ");
    }
}

export class ProcessTaskQueue {
    public processName: string;
    public arrivalTime: number;
    public taskQueue: Queue<Task> = new Queue<Task>();

    public constructor(processName: string, arrivalTime: number) {
        this.processName = processName;
        this.arrivalTime = arrivalTime;
    }
    public addTask(task: Task) {
        task.belongTo = this.processName;
        this.taskQueue.enqueue(task);
    }
    public toString() {
        return `${this.processName} ${this.arrivalTime} ${this.taskQueue.toString()}`;
    }
}
