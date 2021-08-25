// function getRandomHumoresqueFromArray(arr: string[], length: number): string {
//   const result = arr[getRandomNumber(0, arr.length - 1)];
//   if (result.split(" ").length > length) {
//     return getRandomHumoresqueFromArray(arr, length);
//   } else {
//     return result;
//   }
// }

import { addTaskToQueue } from "../worker/workerInit";

// export async function getCustomHumoresque(args: number[]) {
//   const first = (await getHumoresque()).split(" ");
//   const second = (await getHumoresque()).split(" ");
//   return first
//     .slice(0, Math.floor((first.length / 100) * args[0]))
//     .concat(second.slice(Math.floor((second.length / 100) * args[1])))
//     .join(" ");
// }

export async function getCustomHumoresque(args: number[]) {
  addTaskToQueue({ type: "humoresque", url: "" });
}
