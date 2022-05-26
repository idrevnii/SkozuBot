import { getExchangeRate, getCryptoExchangeRate } from "../api"
import { CryptoCurrency, Currency, CurrencyPair } from "./models"

const currencyMap: Record<Currency, CurrencyPair> = {
    EUR: { from: "RUB", to: "EUR" },
    USD: { from: "RUB", to: "USD" },
    CNY: { from: "RUB", to: "CNY" },
}

export async function getCurrencyRate(currency: Currency) {
    const rateStr = await getExchangeRate(currencyMap[currency])
    if (!rateStr) return
    return parseFloat(rateStr.replace(",", ".").trim()).toFixed(2)
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
