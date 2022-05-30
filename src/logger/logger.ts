import pino from "pino"
import { createWriteStream } from "pino-logflare"

export const logger = (() => {
    if (process.env.NODE_ENV == "production") {
        if (process.env.LOG_API_TOKEN && process.env.LOG_SOURCE_TOKEN) {
            const stream = createWriteStream({
                apiKey: process.env.LOG_API_TOKEN,
                sourceToken: process.env.LOG_SOURCE_TOKEN,
            })
            return pino({}, stream)
        }
        return pino({}, pino.destination("logs/combined.log"))
    }
    return pino({
        transport: {
            target: "pino-pretty",
        },
    })
})()
