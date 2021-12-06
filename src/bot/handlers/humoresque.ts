import { getCustomHumoresque } from "../../core/humoresque";
import { logger } from "../../logger/logger";
import { isArgumentsEmpty, validateArguments } from "../../misc/utils";
import { IContext } from "../models";
import { identificateUser } from "../utils";

export async function commandHumoresqueHandler({
  state,
  from,
  chat,
  i18n,
  reply,
}: IContext) {
  if (state.args && chat?.id) {
    const correctArgs = isArgumentsEmpty(state.args)
      ? [50, 50]
      : validateArguments(state.args);
    if (correctArgs) {
      await getCustomHumoresque(correctArgs, chat.id);
      logger.info(
        `Reqeusted humoresque to chat: ${chat.id} from user: ${identificateUser(
          from
        )}`
      );
    } else {
      await reply(i18n.t("humoresque_wrong_coefs"));
    }
  } else {
    await reply(i18n.t("unknown_error"));
  }
}

export async function callbackHumoresqueHandler({
  state,
  from,
  chat,
  i18n,
  answerCbQuery,
}: IContext) {
  if (chat?.id && state.args) {
    const correctArgs = validateArguments(state.args);
    if (correctArgs) {
      await getCustomHumoresque(correctArgs, chat.id);
      answerCbQuery();
      logger.info(
        `Reqeusted humoresque to chat: ${chat.id} from user: ${identificateUser(
          from
        )}`
      );
    } else {
      answerCbQuery(i18n.t("humoresque_wrong_callback_coefs"));
      logger.info(`Wrong callback arguments\n${state.args}\nfrom: ${chat.id}`);
    }
  }
}
