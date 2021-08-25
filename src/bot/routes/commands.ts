import { Router } from "telegraf";
import { getCustomHumoresque } from "../../core/humoresque";
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
          route: "shabbat",
          state: { args: splitted.slice(1) },
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

commandsRoute.on("unknown", () => {});
