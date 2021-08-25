require("dotenv").config();
import Telegraf from "telegraf";
import { IContext } from "./models";
import { callbackRoute } from "./routes/callbackQuery";
import { commandsRoute } from "./routes/commands";

export let bot: Telegraf<IContext>;

export async function createBot() {
  // @ts-ignore
  bot = new Telegraf<IContext>(process.env.BOT_TOKEN);

  bot.on("text", commandsRoute);

  bot.on("callback_query", callbackRoute);

  bot.catch((err: Error) => console.log(err));

  const { telegram: tg } = bot;
  tg.callApi("getUpdates", { offset: -1 })
    // @ts-ignore
    .then((updates) => updates.length && updates[0].update_id + 1)
    .then((offset) => {
      if (offset) return tg.callApi("getUpdates", { offset });
    })
    .then(() => bot.launch())
    .then(() => console.info("The bot is launched"))
    .catch((err) => console.error(err));
}
