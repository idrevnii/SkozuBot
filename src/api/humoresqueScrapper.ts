import cheerio from "cheerio";
import got from "got/dist/source";
import { logger } from "../logger/logger";
import { getRandomNumber } from "../misc/utils";

async function getHtml(url: string) {
  return got(url)
    .then((resp) => [resp.body])
    .catch((err) => {
      logger.log("error", "http error: ", err);
      return [];
    });
}

export async function getHumoresquesFromRandomPage() {
  const random = getRandomNumber(0, 4112);
  const standartUrl = `https://humornet.ru/anekdot/page/${random}/`;
  const body = await getHtml(standartUrl);
  return body.map((html) => {
    const $ = cheerio.load(html);
    return $("div .text")
      .map((i, el) => $(el).text())
      .toArray();
  });
}
