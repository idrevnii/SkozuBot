import winston from "winston";

export const logger = winston.createLogger({
  level: "http",
  defaultMeta: { service: "SkozuBot" },
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
