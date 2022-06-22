import { logger } from "../../logger"
import { TextContext } from "../models"
import { getCurrencyRates } from "../../core"

export async function currencyHandler(ctx: TextContext) {
    logger.info(
        `Reqeusted currency to chat: ${ctx.from.id} from user: ${ctx.whois(
            ctx.from
        )}`
    )

    const rates = await getCurrencyRates()

    return ctx.reply(ctx.i18n.t("currency_show", rates))
}
