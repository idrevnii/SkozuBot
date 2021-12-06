import { createBot } from "./bot/app";
import { logger } from "./logger/logger";

(async () => {
  await createBot();

  process
    .on("unhandledRejection", (reason) => {
      logger.warn(`Rejection: ${reason}`);
    })
    .on("uncaughtException", (err) => {
      logger.warn(`Exception: ${err}`);
    });
})();
