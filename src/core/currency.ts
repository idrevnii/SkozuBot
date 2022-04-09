import { getExchangeRate } from "../api"
import { Currency, CurrencyPair } from "./models"

const currencyMap: Record<Currency, CurrencyPair> = {
    EUR: "EUR_RUB",
    USD: "USD_RUB",
}

export async function getCurrencyRate(currency: Currency) {
    const rateStr = await getExchangeRate(currencyMap[currency])
    if (!rateStr) return
    return rateStr
        ?.slice(rateStr.indexOf(":") + 1, rateStr.lastIndexOf("на"))
        .trim()
}
