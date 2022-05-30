import { getHumoresquesFromRandomPage } from "../api"
import { logger } from "../logger"
import { getPairRandomNumberFromRange } from "../misc/utils"

const MAX_HUMORESQUE_LENGTH = 100

export async function getHumoresque(args: number[]) {
    const humoresques = await getHumoresquesFromRandomPage()
    if (!humoresques) {
        logger.error("Can't create humoresque, get undefined from web")
        return
    }
    const smallHumoresques = humoresques.filter(
        (hum) => hum.length <= MAX_HUMORESQUE_LENGTH
    )
    const random = getPairRandomNumberFromRange(0, smallHumoresques.length - 1)
    const cuttedHumoresques: string[] = random.map((num, index) => {
        const humor = smallHumoresques[num]
        return index === 0
            ? humor.slice(0, Math.floor((humor.length / 100) * args[index]))
            : humor.slice(Math.floor((humor.length / 100) * args[index]))
    })
    return cuttedHumoresques.join(" ")
}
