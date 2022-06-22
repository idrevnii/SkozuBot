export type Currency = "USD" | "EUR" | "CNY"

export type CurrencyPair = {
    from: "RUB"
    to: Currency
}

export type CryptoCurrency = "BTC" | "ETH" | "USDT"

export type TCurrency = Currency | CryptoCurrency
