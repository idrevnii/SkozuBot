import { Router } from "telegraf";
import { createDemotivator } from "../../core/demotivator";
import { getCustomHumoresque } from "../../core/humoresque";
import { getRemainingDaysUntillSabbath } from "../../core/sabbath";
import { IContext } from "../models";

export const commandsRoute = new Router<IContext>(({ message }) => {
  if (message?.text) {
    const splitted = message.text.split(" ");
    switch (splitted[0]) {
      case "/humoresque":
      case "/humoresque@Skozu19_bot":
        return {
          route: "humoresque",
          state: { args: splitted.slice(1) },
        };
      case "/shabbat":
      case "/shabbat@Skozu19_bot":
        return {
          route: "sabbath",
        };
      case "/demotivator":
      case "/demotivator@Skozu19_bot":
        return {
          route: "demotivator",
        };
    }
  }

  return {
    route: "unknown",
    state: {},
  };
});

commandsRoute.on("humoresque", async ({ state, reply, chat }) => {
  if (state.args && chat?.id) {
    const numberArgs = state.args
      .slice(0, 2)
      .map((arg) => (isNaN(+arg) ? 0 : +arg));
    const medianArgs = numberArgs.reduce((acc, val) => acc + val, 0) / 2;
    if (
      (numberArgs.length === 2 && medianArgs === 50) ||
      numberArgs.length === 0
    ) {
      const correctArgs = state.args.length === 0 ? [50, 50] : numberArgs;
      const humoresque = await getCustomHumoresque(correctArgs, chat.id);
      console.log(`Reqeusted humoresque to chat: ${chat.id}`);
    } else {
      await reply(
        "Неправильные пропорции юморески! Пропорция должна быть больше нуля и меньше 100"
      );
    }
  } else {
    await reply("Что-то пошло не так. Попробуй еще раз");
  }
});

commandsRoute.on("sabbath", ({ reply }) => {
  const remainingDays = getRemainingDaysUntillSabbath();
  if (remainingDays === 0) {
    reply("Шаббат шалом!");
  } else {
    reply(`Еще ${remainingDays} дня до шаббата :(`);
  }
});

commandsRoute.on(
  "demotivator",
  async ({ telegram, message, replyWithPhoto, reply }) => {
    if (message?.reply_to_message && message.reply_to_message.from?.id) {
      try {
        const id = message.reply_to_message.from.id;
        // @ts-ignore
        const title = message.reply_to_message.text;
        const subtitle = "";
        const userPhotos = await telegram.getUserProfilePhotos(id, 0, 1);
        const photos = userPhotos.photos;
        const photoId = photos[0][photos[0].length - 1].file_id;
        const photoLink = await telegram.getFileLink(photoId);
        const demotivator = await createDemotivator(photoLink, title, subtitle);
        await replyWithPhoto(
          {
            source: demotivator,
          },
          { reply_to_message_id: message.message_id }
        );
      } catch (e) {
        console.error(e);
        await reply(
          "Не могу сгенерировать демотиватор с этим пользователем. Возможно он заблокировал бота"
        );
      }
    } else {
      await reply("Эту комманду нужно вызывать ответом на другое сообщение!");
    }
  }
);

commandsRoute.on("unknown", () => {});
