import { Router } from "telegraf";
import { getCustomHumoresque } from "../../core/humoresque";
import { IContext } from "../models";

export const callbackRoute = new Router<IContext>(({ callbackQuery }) => {
  if (callbackQuery?.data) {
    const splitted = callbackQuery.data.split(":");
    switch (splitted[0]) {
      case "humoresque":
        return {
          route: "humoresque",
          state: { args: [splitted[1], splitted[2]] },
        };
    }
  }
  return {
    route: "unknown",
    state: {},
  };
});

callbackRoute.on("humoresque", async ({ chat, state, answerCbQuery }) => {
  if (chat?.id && state.args) {
    const numArgs = state.args.map((arg) => +arg);
    const humoresque = await getCustomHumoresque(numArgs, chat.id);
    answerCbQuery();
    console.log(`Reqeusted humoresque to chat: ${chat.id}`);
  }
});
