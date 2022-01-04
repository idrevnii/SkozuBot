import Bull from "bull";
import { parentPort } from "worker_threads";
import { Task, TaskResult } from "./models";
import { humoresquesQueueHandler } from "./queue";

const queue = new Bull("queue", process.env.REDIS_URL || "");

queue.process("humoresque", humoresquesQueueHandler);

queue.on("completed", (job, result: TaskResult) => {
  parentPort?.postMessage(result);
  job.remove();
});

parentPort?.on("message", (task: Task) => {
  queue.add(task.type, task);
});
