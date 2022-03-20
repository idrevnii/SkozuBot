import { InlineKeyboard } from "grammy"

export function getHumoresqueKeyboard(args: number[]) {
    return new InlineKeyboard().add({
        text: "Еще",
        callback_data: `humor:${args[0]}:${args[1]}`,
    })
}
