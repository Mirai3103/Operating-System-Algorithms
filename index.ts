import SchedulingService, { ProcessTaskQueue, SchedulerType, Task, TaskType } from "./CPUSScheduling";
import createSolution from "./CPUSScheduling/index";

const process1 = new ProcessTaskQueue("P1", 0);
process1.addTask(new Task(TaskType.CPU, 8));
process1.addTask(new Task(TaskType.IO1, 5));
process1.addTask(new Task(TaskType.CPU, 1));

const process2 = new ProcessTaskQueue("P2", 2);
process2.addTask(new Task(TaskType.CPU, 1));
process2.addTask(new Task(TaskType.IO2, 8));
process2.addTask(new Task(TaskType.CPU, 2));
process2.addTask(new Task(TaskType.IO1, 5));
const process3 = new ProcessTaskQueue("P3", 10);
process3.addTask(new Task(TaskType.CPU, 6));
process3.addTask(new Task(TaskType.IO1, 5));
process3.addTask(new Task(TaskType.CPU, 2));
process3.addTask(new Task(TaskType.IO2, 3));

const process4 = new ProcessTaskQueue("P4", 11);
process4.addTask(new Task(TaskType.CPU, 3));
process4.addTask(new Task(TaskType.IO2, 20));

const solution = createSolution(SchedulerType.RR, [process1, process2, process3, process4], 4);
solution.run();
