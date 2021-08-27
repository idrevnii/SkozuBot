import random from "random";

export function getArguments(arr: string[]) {
  return arr.slice(1);
}

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
