import { DOLLAR_CHANGE } from "../core"
import { getCurrencyRates } from "../core"
import { bot } from "./app"
import { i18n } from "./middlewares"

const SKOZU_GROUP_ID = "-1001414035832"

export async function notifyDollarChange(dollarChange: string) {
    if (dollarChange === DOLLAR_CHANGE.INCREASED) {
        await bot.api.sendMessage(
            SKOZU_GROUP_ID,
            i18n.t("ru", "dollar_increased")
        )
    }
    if (dollarChange === DOLLAR_CHANGE.DECREASED) {
        await bot.api.sendMessage(
            SKOZU_GROUP_ID,
            i18n.t("ru", "dollar_decreased")
        )
    }
    const rates = await getCurrencyRates()

    return bot.api.sendMessage(
        SKOZU_GROUP_ID,
        i18n.t("ru", "currency_show", rates)
    )
}
