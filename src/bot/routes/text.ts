import { Router } from "@grammyjs/router"
import {
    demotivatorHandler,
    sabbathHandler,
    humoresqueHandler,
    startHandler,
} from "../handlers"
import { TextContext } from "../models"

const commands: Record<string, string> = {
    "/start": "start",
    "/start@Skozu19_bot": "start",
    "/humoresque": "humoresque",
    "/humoresque@Skozu19_bot": "humoresque",
    "/shabbat": "sabbath",
    "/shabbat@Skozu19_bot": "sabbath",
    "/demotivator": "demotivator",
    "/demotivator@Skozu19_bot": "demotivator",
}

export const textRouter = new Router<TextContext>((ctx) => {
    const command = ctx.msg.text.split(" ")[0]
    if (commands[command]) {
        return commands[command]
    }
})

textRouter.route("start", startHandler)
textRouter.route("humoresque", humoresqueHandler)
textRouter.route("sabbath", sabbathHandler)
textRouter.route("demotivator", demotivatorHandler)
