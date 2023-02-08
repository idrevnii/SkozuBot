import { getExchangeRate, getCryptoExchangeRate } from "../api"
import { notifyDollarChange } from "../bot/notify"
import { logger } from "../logger"
import { CryptoCurrency, Currency, CurrencyPair, TCurrency } from "./models"

const currencyMap: Record<Currency, CurrencyPair> = {
    EUR: { from: "RUB", to: "EUR" },
    USD: { from: "RUB", to: "USD" },
    CNY: { from: "RUB", to: "CNY" },
}

export async function getCurrencyRate(currency: Currency) {
    const rate = await getExchangeRate(currencyMap[currency])
    if (typeof rate !== 'string') {
        logger.error(`Failed to get currency rates, reason:\n${rate.message}`)
        return
    }
    return parseFloat(rate.replace(",", ".").trim()).toFixed(2)
}

let cryptoCache: Record<string, string>[] | undefined

const cryptoMap: Record<CryptoCurrency, string> = {
    BTC: "BTCUSDT",
    ETH: "ETHUSDT",
    USDT: "USDTRUB",
}

export async function getCryptoCurrencyRate(currency: CryptoCurrency) {
    if (!cryptoCache) {
        const response = await getCryptoExchangeRate()
        if (!Array.isArray(response)) {
            logger.error(`Failed to get crypto rates, reason:\n${response?.message}`)
            return
        }
        cryptoCache = response
        setTimeout(() => (cryptoCache = undefined), 300000)
    }
    const price = cryptoCache.find(
        (crypto) => crypto.symbol === cryptoMap[currency]
    )?.price
    if (!price) return
    return parseFloat(price).toFixed(2)
}

export async function getCurrencyRates() {
    const rates = {} as Record<TCurrency, string>
    for (const currency in currencyMap) {
        rates[currency] = await getCurrencyRate(currency as Currency)
    }
    for (const currency in cryptoMap) {
        rates[currency] = await getCryptoCurrencyRate(
            currency as CryptoCurrency
        )
    }
    return rates
}

let dollarCache: number | undefined

export async function initDollarCache() {
    const rate = await getCurrencyRate("USD")
    if (!rate) return
    dollarCache = parseInt(rate.replace(",", ".").trim())
}

export const DOLLAR_CHANGE = {
    INCREASED: "increased",
    DECREASED: "decreased",
    NO_CHANGE: "no_change",
}

async function checkDollarRate() {
    if (!dollarCache) return
    const newRate = await getCurrencyRate("USD")
    if (!newRate) return
    const newDollar = parseInt(newRate.replace(",", ".").trim())
    const delta = newDollar - dollarCache
    if (delta === 1) {
        dollarCache = newDollar
        return DOLLAR_CHANGE.INCREASED
    }
    if (delta === -1) {
        dollarCache = newDollar
        return DOLLAR_CHANGE.DECREASED
    }
    return DOLLAR_CHANGE.NO_CHANGE
}

export async function cronDollarHandler() {
    const result = await checkDollarRate()
    if (
        result === DOLLAR_CHANGE.INCREASED ||
        result === DOLLAR_CHANGE.DECREASED
    ) {
        return notifyDollarChange(result)
    }
}
