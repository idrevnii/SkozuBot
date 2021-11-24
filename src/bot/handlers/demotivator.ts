import { createDemotivator } from "../../core/demotivator";
import { logger } from "../../logger/logger";
import { IContext } from "../models";

export async function commandDemotivatorHandler({
  state,
  telegram,
  message,
  i18n,
  replyWithPhoto,
  reply,
}: IContext) {
  if (message?.reply_to_message && message.reply_to_message.from?.id) {
    // @ts-ignore
    if (message.reply_to_message.text) {
      try {
        logger.info(`Called demotivator create from: ${message.from?.id}`);
        const id = message.reply_to_message.from.id;
        // @ts-ignore
        const title = message.reply_to_message.text;
        const subtitle = state.args?.join(" ") || "";
        const userPhotos = await telegram.getUserProfilePhotos(id, 0, 1);
        const photos = userPhotos.photos;
        const photoId = photos[0][photos[0].length - 1].file_id;
        const photoLink = await telegram.getFileLink(photoId);
        const demotivator = await createDemotivator(photoLink, title, subtitle);
        await replyWithPhoto(
          {
            source: demotivator,
          },
          { reply_to_message_id: message.message_id }
        );
      } catch (e) {
        logger.warn(e);
        await reply(i18n.t("demotivator_blocked_bot"));
      }
    } else {
      await reply(i18n.t("demotivator_message_empty"));
    }
  } else {
    await reply(i18n.t("demotivator_need_reply"));
  }
}
