// function getRandomHumoresqueFromArray(arr: string[], length: number): string {
//   const result = arr[getRandomNumber(0, arr.length - 1)];
//   if (result.split(" ").length > length) {
//     return getRandomHumoresqueFromArray(arr, length);
//   } else {
//     return result;
//   }
// }

import { getHumoresqueKeyboard } from "../bot/keyboard";
import { sendHumoresqueMessage } from "../bot/send";
import { getPairRandomNumberFromRange } from "../misc/utils";
import { IHumoresquesResult, ITask } from "../worker/models";
import { addTaskToQueue } from "../worker/workerInit";

// export async function getCustomHumoresque(args: number[]) {
//   const first = (await getHumoresque()).split(" ");
//   const second = (await getHumoresque()).split(" ");
//   return first
//     .slice(0, Math.floor((first.length / 100) * args[0]))
//     .concat(second.slice(Math.floor((second.length / 100) * args[1])))
//     .join(" ");
// }

export async function getCustomHumoresque(args: number[], chatId: number) {
  addTaskToQueue({ type: "humoresque", chatId, args });
}

export async function processHumoresque({
  chatId,
  humoresques,
  args,
}: IHumoresquesResult) {
  const fixedHumoresques = humoresques[0]
    .map((hum) => (hum.split(" ").length > 40 ? undefined : hum))
    .filter(Boolean);
  const randomNums = getPairRandomNumberFromRange(0, fixedHumoresques.length);
  const cuttedHumoresques = randomNums.map((num, index) => {
    const humor = fixedHumoresques[num];
    if (humor) {
      return index === 0
        ? humor.slice(0, Math.floor((humor.length / 100) * args[index]))
        : humor.slice(Math.floor((humor.length / 100) * args[index]));
    }
  });
  console.log(cuttedHumoresques);
  return sendHumoresqueMessage(chatId, cuttedHumoresques.join(" "), "ploho");
}
