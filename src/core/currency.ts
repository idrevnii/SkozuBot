import { getExchangeRate, getCryptoExchangeRate } from "../api"
import { CryptoCurrency, Currency, CurrencyPair } from "./models"

const currencyMap: Record<Currency, CurrencyPair> = {
    EUR: "EUR_RUB",
    USD: "USD_RUB",
}

export async function getCurrencyRate(currency: Currency) {
    const rateStr = await getExchangeRate(currencyMap[currency])
    if (!rateStr) return
    return parseFloat(
        rateStr
            ?.slice(rateStr.indexOf(":") + 1, rateStr.lastIndexOf("на"))
            .trim()
    ).toFixed(2)
}

const cryptoCurrencyMap = {
    BTC: "BTCRUB",
    ETH: "ETHRUB",
    USDT: "USDTRUB",
}

export async function getCryptoCurrencyRate(crypto: CryptoCurrency) {
    const cryptoList = await getCryptoExchangeRate()
    if (!cryptoList) return
    const price = cryptoList.find(
        (cryptoObj) => cryptoObj.symbol === cryptoCurrencyMap[crypto]
    )?.price
    if (!price) return
    return parseFloat(price).toFixed(2)
}
