import { getHumoresque } from "../../core"
import { logger } from "../../logger"
import { validateArguments, isArgumentsEmpty } from "../../misc"
import { getHumoresqueKeyboard } from "../keyboard"
import { CallbackContext, TextContext } from "../models"

export async function humoresqueHandler(ctx: TextContext) {
    const text = ctx.message.text
    const args = text.split(" ").slice(1, 3)
    const correctArgs = isArgumentsEmpty(args)
        ? [50, 50]
        : validateArguments(args)
    if (correctArgs) {
        logger.info(
            `Reqeusted humoresque to chat: ${
                ctx.chat.id
            } from user: ${ctx.whois(ctx.from)}`
        )
        const humoresque = await getHumoresque(correctArgs)
        if (humoresque) {
            await ctx.reply(humoresque, {
                reply_markup: getHumoresqueKeyboard(correctArgs),
            })
        } else {
            await ctx.reply(ctx.i18n.t("web_error"))
        }
    } else {
        await ctx.reply(ctx.i18n.t("humoresque_wrong_coefs"))
    }
}

export async function callbackHumoresqueHandler(ctx: CallbackContext) {
    const args = ctx.callbackQuery.data.split(":").slice(1, 3)
    const correctArgs = validateArguments(args)
    if (correctArgs) {
        logger.info(
            `Reqeusted humoresque to chat: ${
                ctx.callbackQuery.from.id
            } from user: ${ctx.whois(ctx.from)}`
        )
        ctx.answerCallbackQuery()
        const humoresque = await getHumoresque(correctArgs)
        if (humoresque) {
            await ctx.reply(humoresque, {
                reply_markup: getHumoresqueKeyboard(correctArgs),
            })
        } else {
            await ctx.reply(ctx.i18n.t("web_error"))
        }
    } else {
        await ctx.reply(ctx.i18n.t("humoresque_wrong_coefs"))
    }
}
