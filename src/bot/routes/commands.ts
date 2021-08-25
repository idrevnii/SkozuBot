import { Router } from "telegraf";
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

commandsRoute.on("humoresque", async ({ state, reply }) => {
  if (state.args) {
    const numberArgs = state.args
      .slice(0, 2)
      .map((arg) => (isNaN(+arg) ? 0 : +arg));
    const medianArgs = numberArgs.reduce((acc, val) => acc + val, 0) / 2;
    if (
      (numberArgs.length === 2 && medianArgs === 50) ||
      numberArgs.length === 0
    ) {
      const correctArgs = state.args.length === 0 ? [50, 50] : numberArgs;
      console.log(correctArgs);
      await reply("Correct!");
    } else {
      await reply("Wrong numbers!");
    }
  } else {
    await reply("Something went wrong!");
  }
});

commandsRoute.on("unknown", () => {});
