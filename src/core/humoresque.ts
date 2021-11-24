import { sendErrorMessage, sendHumoresqueMessage } from "../bot/send";
import { getPairRandomNumberFromRange } from "../misc/utils";
import { IHumoresquesResult } from "../worker/models";
import { addTaskToQueue } from "../worker/workerInit";

export async function getCustomHumoresque(args: number[], chatId: number) {
  addTaskToQueue({ type: "humoresque", chatId, args });
}

export async function processHumoresque({
  chatId,
  humoresques,
  args,
}: IHumoresquesResult) {
  if (humoresques[0].length === 0) {
    return sendErrorMessage(chatId);
  } else {
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
    return sendHumoresqueMessage(
      chatId,
      cuttedHumoresques.join(" "),
      `humoresque:${args[0]}:${args[1]}`
    );
  }
}
