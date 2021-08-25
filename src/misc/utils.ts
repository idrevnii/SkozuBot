import random from "random";

export function getRandomNumber(min: number, max: number) {
  return random.int(min, max);
}
