import { startBot, stopBot } from "./bot/app"
import { logger } from "./logger"

async function gracefulStop() {
    await stopBot()
}

async function main() {
    await startBot()

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
