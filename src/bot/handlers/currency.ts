import { getCryptoCurrencyRate, getCurrencyRate } from "../../core"
import { logger } from "../../logger"
import { TextContext } from "../models"

export async function currencyHandler(ctx: TextContext) {
    logger.info(
        `Reqeusted currency to chat: ${ctx.from.id} from user: ${ctx.whois(
            ctx.from
        )}`
    )
    const rateUSD =
        (await getCurrencyRate("USD")) ?? ctx.i18n.t("currency_error")
    const rateEUR =
        (await getCurrencyRate("EUR")) ?? ctx.i18n.t("currency_error")
    const rateCNY =
        (await getCurrencyRate("CNY")) ?? ctx.i18n.t("currency_error")
    const rateBTC =
        (await getCryptoCurrencyRate("BTC")) ?? ctx.i18n.t("currency_error")
    const rateETH =
        (await getCryptoCurrencyRate("ETH")) ?? ctx.i18n.t("currency_error")
    const rateUSDT =
        (await getCryptoCurrencyRate("USDT")) ?? ctx.i18n.t("currency_error")
    return ctx.reply(
        ctx.i18n.t("currency_show", {
            rateUSD,
            rateEUR,
            rateCNY,
            rateUSDT,
            rateBTC,
            rateETH,
        })
    )
}
