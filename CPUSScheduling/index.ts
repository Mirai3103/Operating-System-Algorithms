import { GanntChart, ProcessTaskQueue, Queue, SchedulerType, Task, TaskStatus, TaskType } from "./CPUSchedulingTypes";
import FCFSSolution from "./FirstComeFirstServed";
import SJFSolution from "./ShortedJobFirst";
import SRTFSolution from "./ShortestRemaingTimeFirst";
import RRSolution from "./RoundRobin";
const createSolution = (schedulerType: SchedulerType, processTaskList: ProcessTaskQueue[], timeQuantum?: number) => {
    switch (schedulerType) {
        case SchedulerType.FCFS:
            return new FCFSSolution(processTaskList);
        case SchedulerType.SJF:
            return new SJFSolution(processTaskList);
        case SchedulerType.SRTF:
            return new SRTFSolution(processTaskList);
        case SchedulerType.RR:
            if (timeQuantum === undefined) {
                throw new Error("Time quantum is required for Round Robin scheduling");
            }
            return new RRSolution(processTaskList, timeQuantum!);
    }
};

export default createSolution;

export { GanntChart, ProcessTaskQueue, Queue, SchedulerType, Task, TaskStatus, TaskType };
