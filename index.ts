import SchedulingService, { ProcessTaskQueue, SchedulerType, Task, TaskType } from "./CPUSScheduling";
import createSolution from "./CPUSScheduling/index";

const process1 = new ProcessTaskQueue("P1", 0);
process1.addTask(new Task(TaskType.CPU, 15));

const process2 = new ProcessTaskQueue("P2", 1);
process2.addTask(new Task(TaskType.CPU, 20));

const process3 = new ProcessTaskQueue("P3", 5);
process3.addTask(new Task(TaskType.CPU, 10));

const process4 = new ProcessTaskQueue("P4", 7);
process4.addTask(new Task(TaskType.CPU, 22));

const solution = createSolution(SchedulerType.RR, [process1, process2, process3, process4], 3);
solution.run();
