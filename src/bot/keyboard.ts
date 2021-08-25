import { Extra, Markup } from "telegraf";

export function getHumoresqueKeyboard(callbackData: string) {
  return Extra.markup((m) =>
    m.inlineKeyboard([m.callbackButton("Еще", callbackData)])
  );
}
