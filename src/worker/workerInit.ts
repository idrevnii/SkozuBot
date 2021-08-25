import { Worker } from "worker_threads";
import { ITask } from "./models";

const worker = new Worker("./src/worker/worker.js", {
  workerData: {
    path: "./worker.ts",
  },
});

worker.on("message", (result) => {
  console.log(result, "main thread");
});

export function addTaskToQueue(task: ITask) {
  worker.postMessage(task);
}
