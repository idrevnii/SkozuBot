import { bot, i18n } from "./app";
import { getHumoresqueKeyboard } from "./keyboard";

export async function sendMessage(chatId: number, text: string, extra?: any) {
  return bot.telegram.sendMessage(chatId, text, extra);
}

export async function sendHumoresqueMessage(
  chatId: number,
  text: string,
  callbackData: string
) {
  console.log(`Humoresque sended to chat: ${chatId}`);
  return sendMessage(chatId, text, getHumoresqueKeyboard(callbackData));
}

export async function sendErrorMessage(chatId: number) {
  return sendMessage(chatId, i18n.t("web_error", "ru"));
}
