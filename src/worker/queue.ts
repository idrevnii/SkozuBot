import Bull from "bull";
import { worker } from "./workerInit";
import { getHumoresquesFromRandomPage } from "../api/humoresqueScrapper";
import { Task, TaskResult } from "./models";
import { processHumoresque } from "../core/humoresque";

export function createTask(task: Task) {
  worker.postMessage(task);
}

export async function humoresquesQueueHandler(
  job: Bull.Job,
  done: Bull.DoneCallback
) {
  getHumoresquesFromRandomPage()
    .then((result) =>
      done(undefined, {
        type: job.data.type,
        chatId: job.data.chatId,
        args: job.data.args,
        humoresques: result,
      })
    )
    .catch((err) => done(err, undefined));
}

export async function resultQueueHandler(result: TaskResult) {
  if (result.type === "humoresque") {
    processHumoresque(result);
  }
}
