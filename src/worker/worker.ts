import Bull from "bull";
import { parentPort } from "worker_threads";
import { getHumoresquesFromRandomPage } from "../api/humoresqueScrapper";

const humoresques = new Bull("humoresques");

humoresques.process((job) => {
  const humor = getHumoresquesFromRandomPage();
  console.log(humor);
});

parentPort?.on("message", (message) => {
  humoresques.add(message);
});
