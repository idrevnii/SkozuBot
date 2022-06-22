// require("dotenv").config()
import { Bot } from "grammy"
import { ignoreOld, sequentialize } from "grammy-middlewares"
import { run } from "@grammyjs/runner"
import { hydrateReply, parseMode } from "@grammyjs/parse-mode"
import { hydrateFiles } from "@grammyjs/files"
import { callbackRouter, textRouter } from "./routes"
import { getErrorHandling } from "./errorHandling"
import { getHelpers, getI18n } from "./middlewares"
import type { IContext } from "./models"
import { logger } from "../logger"
import { autoRetry } from "@grammyjs/auto-retry"

export const bot = new Bot<IContext>(process.env.TOKEN || "")

export async function startBot() {
    bot.use(sequentialize())
        .use(ignoreOld())
        .use(getI18n())
        .use(hydrateReply)
        .use(getHelpers())

    bot.api.config.use(parseMode("HTML"))
    bot.api.config.use(hydrateFiles(bot.token))
    bot.api.config.use(autoRetry())

    bot.catch(getErrorHandling())

    bot.on("message:text", textRouter)
    bot.on("callback_query:data", callbackRouter)

    run(bot)
    logger.info("Bot started!")
}

export async function stopBot() {
    return bot.stop()
}
