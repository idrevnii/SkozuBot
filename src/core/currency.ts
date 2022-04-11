import { getExchangeRate, getCryptoExchangeRate } from "../api"
import { CryptoCurrency, Currency, CurrencyPair } from "./models"

const currencyMap: Record<Currency, CurrencyPair> = {
    EUR: "EUR_RUB",
    USD: "USD_RUB",
    CNY: "CNY_RUB",
}

export async function getCurrencyRate(currency: Currency) {
    const rateStr = await getExchangeRate(currencyMap[currency])
    if (!rateStr) return
    return parseFloat(
        rateStr
            ?.slice(rateStr.indexOf(":") + 1, rateStr.lastIndexOf("на"))
            .replace(",", ".")
            .trim()
    ).toFixed(2)
}

let cryptoCache: Record<string, string>[] | undefined

const cryptoCurrencyMap = {
    BTC: "BTCUSDT",
    ETH: "ETHUSDT",
    USDT: "USDTRUB",
}

export async function getCryptoCurrencyRate(crypto: CryptoCurrency) {
    if (!cryptoCache) {
        const cryptoList = await getCryptoExchangeRate()
        if (!cryptoList) return
        cryptoCache = cryptoList
        setTimeout(() => (cryptoCache = undefined), 300000)
    }
    const price = cryptoCache.find(
        (cryptoObj) => cryptoObj.symbol === cryptoCurrencyMap[crypto]
    )?.price
    if (!price) return
    return parseFloat(price).toFixed(2)
}
