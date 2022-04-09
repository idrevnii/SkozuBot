import { getCurrencyRate } from "../../core"
import { TextContext } from "../models"

export async function currencyHandler(ctx: TextContext) {
    const rateUSD =
        (await getCurrencyRate("USD")) ?? ctx.i18n.t("currency_error")
    const rateEUR =
        (await getCurrencyRate("EUR")) ?? ctx.i18n.t("currency_error")
    return ctx.reply(
        ctx.i18n.t("currency_show", {
            rateUSD,
            rateEUR,
        })
    )
}
