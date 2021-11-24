import { Router } from "telegraf";
import { getArguments } from "../../misc/utils";
import { commandDemotivatorHandler } from "../handlers/demotivator";
import { commandHumoresqueHandler } from "../handlers/humoresque";
import { commandSabbathHandler } from "../handlers/sabbath";
import { IContext } from "../models";

export const commandsRoute = new Router<IContext>(({ message }) => {
  if (message?.text) {
    const splitted = message.text.split(" ");
    switch (splitted[0]) {
      case "/humoresque":
      case "/humoresque@Skozu19_bot":
        return {
          route: "humoresque",
          state: { args: getArguments(splitted) },
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
          state: { args: getArguments(splitted) },
        };
    }
  }

  return {
    route: "unknown",
    state: {},
  };
});

commandsRoute.on("humoresque", commandHumoresqueHandler);
commandsRoute.on("sabbath", commandSabbathHandler);
commandsRoute.on("demotivator", commandDemotivatorHandler);
commandsRoute.on("unknown", () => {});
