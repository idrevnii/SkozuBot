import { InputFile } from "grammy"
import { createDemotivator } from "../../core"
import { logger } from "../../logger"
import { TextContext } from "../models"

export async function demotivatorHandler(ctx: TextContext) {
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.from?.id) {
        if (ctx.message.reply_to_message.text) {
            try {
                logger.info(
                    `Called demotivator creation from: ${ctx.whois(ctx.from)}`
                )
                const id = ctx.message.reply_to_message.from.id
                const title = ctx.message.reply_to_message.text
                const subtitle = ctx.message.text.split(" ")[1] || ""
                const userPhotos = await ctx.api.getUserProfilePhotos(id, {
                    offset: 0,
                    limit: 1,
                })
                const photos = userPhotos.photos
                const photoId = photos[0][photos[0].length - 1].file_id
                const photoLink = (await ctx.api.getFile(photoId)).getUrl()

                const demotivator = await createDemotivator(
                    photoLink,
                    title,
                    subtitle
                )
                await ctx.replyWithPhoto(new InputFile(demotivator), {
                    reply_to_message_id: ctx.message.message_id,
                })
            } catch (e) {
                logger.warn(
                    `Can't create demotivator, blocked bot. Reason: ${e}`
                )
                await ctx.reply(ctx.i18n.t("demotivator_blocked_bot"))
            }
        } else {
            await ctx.reply(ctx.i18n.t("demotivator_message_empty"))
        }
    } else {
        await ctx.reply(ctx.i18n.t("demotivator_need_reply"))
    }
}
