import random from "random";

export function getRandomNumber(min: number, max: number) {
  return random.int(min, max);
}

export function getPairRandomNumberFromRange(start: number, end: number) {
  const first = getRandomNumber(start, end);
  let second = first;
  while (first === second) {
    second = getRandomNumber(start, end);
  }
  return [first, second];
}
