import axios from "axios";
import cheerio from "cheerio";
import { getRandomNumber } from "../misc/utils";

async function getHtml(url: string) {
  return axios
    .get(url)
    .then((resp) => [resp.data])
    .catch((err) => {
      console.error(err);
      return [];
    });
}

export async function getHumoresquesFromRandomPage() {
  const random = getRandomNumber(0, 4112);
  const standartUrl = `https://humornet.ru/anekdot/page/${random}/`;
  try {
    const body = await getHtml(standartUrl);
    return body.map((html) => {
      const $ = cheerio.load(html);
      return $("div .text")
        .map((i, el) => $(el).text())
        .toArray();
    });
  } catch {
    return [];
  }
}
