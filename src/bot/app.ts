require("dotenv").config();
import path from "path";
import Telegraf from "telegraf";
import I18n from "telegraf-i18n";
const rateLimit = require("telegraf-ratelimit");
import { IContext } from "./models";
import { callbackRoute } from "./routes/callbackQuery";
import { commandsRoute } from "./routes/commands";

export const i18n = new I18n({
  defaultLanguage: "ru",
  directory: path.resolve(__dirname, "locales"),
});

export let bot: Telegraf<IContext>;

export async function createBot() {
  // @ts-ignore
  bot = new Telegraf<IContext>(process.env.BOT_TOKEN);

  bot.use(i18n.middleware());

  bot.use(
    rateLimit({
      window: 3000,
      limit: 1,
      // @ts-ignore
      onLimitExceeded: ({ answerCbQuery, from, updateType }: IContext) => {
        console.log(`Flood from: ${from?.id}`);
        if (updateType === "callback_query") {
          answerCbQuery("Stop flooding!");
        }
      },
    })
  );

  bot.on("text", commandsRoute);

  bot.on("callback_query", callbackRoute);

  bot.catch((err: Error) => console.error(err));

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
