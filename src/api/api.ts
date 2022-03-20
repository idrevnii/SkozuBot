import got from "got/dist/source"
import parse from "node-html-parser"
import { logger } from "../logger"
import { getRandomNumber } from "../misc/utils"

async function get(url: string) {
    return got(url)
        .then((resp) => resp.body)
        .catch((err) => {
            logger.error(`http error:\n${err}`)
            return
        })
}

export async function getHumoresquesFromRandomPage() {
    const random = getRandomNumber(0, 4112)
    const standartUrl = `https://humornet.ru/anekdot/page/${random}/`
    const body = await get(standartUrl)
    if (body) {
        const root = parse(body)
        return root.querySelectorAll("div .text").map((el) => el.innerText)
    } else {
        return
    }
}
