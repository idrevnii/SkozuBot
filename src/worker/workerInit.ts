import { Worker } from "worker_threads";
import { processHumoresque } from "../core/humoresque";
import { IHumoresquesResult, ITask } from "./models";

const worker = new Worker("./src/worker/worker.js", {
  workerData: {
    path: "./worker.ts",
  },
});

worker.on("message", (result) => {
  if (result.type === "humoresque") {
    processHumoresque(result as IHumoresquesResult);
  }
});

export function addTaskToQueue(task: ITask) {
  worker.postMessage(task);
}
