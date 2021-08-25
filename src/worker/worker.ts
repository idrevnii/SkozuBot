import Bull from "bull";
import { parentPort } from "worker_threads";
import { getHumoresquesFromRandomPage } from "../api/humoresqueScrapper";

const humoresques = new Bull("humoresques");

humoresques.process(async (job, done) => {
  const result = await getHumoresquesFromRandomPage();
  done(undefined, {
    type: job.data.type,
    chatId: job.data.chatId,
    args: job.data.args,
    humoresques: result,
  });
});

humoresques.on("completed", (job, result) => {
  parentPort?.postMessage(result);
  job.remove();
});

parentPort?.on("message", (message) => {
  humoresques.add(message);
});
