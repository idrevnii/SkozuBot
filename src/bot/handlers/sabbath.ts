import { getRemainingSabbathDays } from "../../core"
import { TextContext } from "../models"

export async function sabbathHandler(ctx: TextContext) {
    const remainingDays = getRemainingSabbathDays()
    if (remainingDays === 0) {
        ctx.reply(ctx.i18n.t("sabbath_today"))
    } else {
        ctx.reply(ctx.i18n.t("sabbath_coming", { remainingDays }))
    }
}
