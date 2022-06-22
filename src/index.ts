import { startBot, stopBot } from "./bot/app"
import { initDollarCache } from "./core"
import { cronDollarHandler } from "./core"
import { logger } from "./logger"
import * as cron from "node-cron"

async function gracefulStop() {
    await stopBot()
}

async function main() {
    await startBot()
    await initDollarCache()

    cron.schedule("*/15 * * * *", cronDollarHandler)

    process
        .on("unhandledRejection", (reason) => {
            logger.error(`Rejection: ${reason}`)
        })
        .on("uncaughtException", (err) => {
            logger.error(`Exception: ${err}`)
        })

    process.once("SIGINT", () => gracefulStop())
    process.once("SIGTERM", () => gracefulStop())
}

main()
    .catch((e) => console.error(e))
    .finally(() => gracefulStop())
