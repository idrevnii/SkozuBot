import { Router } from "@grammyjs/router"
import { callbackHumoresqueHandler } from "../handlers"
import { CallbackContext } from "../models"

export const callbackRouter = new Router<CallbackContext>((ctx) => {
    const type = ctx.callbackQuery.data.split(":")[0]
    if (type === "humor") {
        return "humor"
    }
})

callbackRouter.route("humor", callbackHumoresqueHandler)
