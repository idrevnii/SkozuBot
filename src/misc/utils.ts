import random from "random"

export function getArguments(arr: string[], end?: number) {
    return end ? arr.slice(1, end) : arr.slice(1)
}

export function isArgumentsEmpty(args: string[]) {
    return args.length === 0
}

function transformArrayToNumber(arr: string[]) {
    return arr.map((arg) => (isNaN(+arg) ? 0 : +arg))
}

export function validateArguments(args: string[]) {
    const numberArgs = transformArrayToNumber(args)
    const medianArgs = numberArgs.reduce((acc, val) => acc + val, 0) / 2
    return medianArgs === 50 ? numberArgs : false
}

export function getRandomNumber(min: number, max: number) {
    return random.int(min, max)
}

export function getPairRandomNumberFromRange(start: number, end: number) {
    const first = getRandomNumber(start, end)
    let second = first
    while (first === second) {
        second = getRandomNumber(start, end)
    }
    return [first, second]
}
