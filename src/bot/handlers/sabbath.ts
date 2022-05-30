import { getRemainingSabbathDays } from "../../core"
import { logger } from "../../logger"
import { TextContext } from "../models"

export async function sabbathHandler(ctx: TextContext) {
    logger.info(
        `Reqeusted shabbat to chat: ${ctx.from.id} from user: ${ctx.whois(
            ctx.from
        )}`
    )
    const remainingDays = getRemainingSabbathDays()
    if (remainingDays === 0) {
        return ctx.reply(ctx.i18n.t("sabbath_today"))
    }
    return ctx.reply(ctx.i18n.t("sabbath_coming", { remainingDays }))
}
