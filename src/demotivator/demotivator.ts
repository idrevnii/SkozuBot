// The code for this file was taken from here
// https://github.com/zispidd/discord_demotivator_bot/blob/master/modules/demotivator.js
// and slightly tweaked

import { createCanvas, loadImage } from "canvas";

const bg = "./src/demotivator/demotivator.png";

const imageProperties = {
  width: 714,
  height: 745,
};

const canvas = createCanvas(imageProperties.width, imageProperties.height);

export async function demotivatorImage(
  urlImg: any,
  title: any,
  subtitle: any
): Promise<any> {
  const ctx = canvas.getContext("2d");
  ctx.font = "38px Times New Roman";

  const image = await loadImage(bg);
  ctx.drawImage(image, 0, 0);
  const avatar = await loadImage(urlImg);
  ctx.drawImage(avatar, 46, 46, 622, 551);

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(title, 345, 660);

  ctx.font = "normal 32px Times New Roman";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(subtitle, 346, 710);

  const buffer = canvas.toBuffer("image/png");
  return buffer;
}
