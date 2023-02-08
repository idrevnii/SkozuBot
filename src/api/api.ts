import axios from "axios"
import parse from "node-html-parser"
import { CurrencyPair } from "../core/models"
import { getRandomNumber } from "../misc/utils"
import { transformError } from "./error"

async function get<T>(url: string) {
    return axios
        .get<T>(url)
        .then((response) => response.data)
        .catch((error) => transformError(error))
}

export async function getHumoresquesFromRandomPage() {
    const random = getRandomNumber(0, 4112)
    const url = `https://humornet.ru/anekdot/page/${random}/`
    const body = await get<string>(url)
    if (typeof body !== 'string') {
        return body
    }
    const root = parse(body)
    return root.querySelectorAll("div .text").map((el) => el.innerText)
}

async function getMoexExchangeRate(currency: CurrencyPair) {
    const url = `https://www.moex.com/ru/derivatives/currency-rate.aspx?currency=${currency.to}_${currency.from}`
    const body = await get<string>(url)
    if (typeof body !== 'string') {
        return body
    }
    const root = parse(body)
    return root.querySelector("#ctl00_PageContent_tbxCurrentRate")?.innerText ?? ''
}

function buildFinamUrl(currency: CurrencyPair) {
    const baseUrl = "https://www.finam.ru/quote/mosbirzha-valyutnyj-rynok"
    const from = currency.from.toLowerCase()
    const to = currency.to.toLowerCase()
    if (currency.to === "CNY") {
        return `${baseUrl}/${to}-${from}tom-${to}-${from}/`
    }
    return `${baseUrl}/${to}${from}tom-${to}-${from}/`
}

async function getFinamExchangeRate(currency: CurrencyPair) {
    const url = buildFinamUrl(currency)
    const body = await get<string>(url)
    if (typeof body !== 'string') {
        return body
    }
    const root = parse(body)
    return root.querySelector("span.PriceInformation__price--26G")?.innerText ?? ''
}

export async function getExchangeRate(currency: CurrencyPair) {
    const moex = await getMoexExchangeRate(currency)
    if (typeof moex !== 'string') {
        const finam = await getFinamExchangeRate(currency)
        return finam
    }
    return moex?.slice(moex.indexOf(":") + 1, moex.lastIndexOf("на"))
}

export async function getCryptoExchangeRate() {
    const url = "https://api.binance.com/api/v3/ticker/price"
    const body = await get<Record<string, string>[] | undefined>(url)
    return body
}
