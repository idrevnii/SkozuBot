import { Worker } from "worker_threads";
import { resultQueueHandler } from "./queue";

export const worker = new Worker("./src/worker/worker.js", {
  workerData: {
    path: "./worker.ts",
  },
});

worker.on("message", resultQueueHandler);
