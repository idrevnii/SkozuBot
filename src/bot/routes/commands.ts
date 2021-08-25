import { Router } from "telegraf";
import { IContext } from "../models";

export const commandsRoute = new Router<IContext>(({ message }) => {
  if (message?.text) {
    const splitted = message.text.split(" ");
    switch (splitted[0]) {
      case "humoresque":
      case "humoresque@Skozu19_bot":
        return {
          route: "humoresque",
          state: { args: splitted.slice(1) },
        };
      case "shabbat":
      case "shabbat@Skozu19_bot":
        return {
          route: "shabbat",
          state: { args: splitted.slice(1) },
        };
    }
  }

  return {
    route: "unknown",
  };
});

commandsRoute.on("humoresque", (ctx) => {
  console.log(ctx);
});

commandsRoute.on("unknown", () => {});
