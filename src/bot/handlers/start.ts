import { TextContext } from "../models"

export async function startHandler(ctx: TextContext) {
    return ctx.reply(ctx.i18n.t("hello"))
}
