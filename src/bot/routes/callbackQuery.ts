import { Router } from "telegraf";
import { getArguments } from "../../misc/utils";
import { callbackHumoresqueHandler } from "../handlers/humoresque";
import { IContext } from "../models";

export const callbackRoute = new Router<IContext>(({ callbackQuery }) => {
  if (callbackQuery?.data) {
    const splitted = callbackQuery.data.split(":");
    switch (splitted[0]) {
      case "humoresque":
        return {
          route: "humoresque",
          state: { args: getArguments(splitted) },
        };
    }
  }
  return {
    route: "unknown",
    state: {},
  };
});

callbackRoute.on("humoresque", callbackHumoresqueHandler);
