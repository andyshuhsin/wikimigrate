export interface Combination<T> {
    combinator: "and" | "or",
    operands: Array<T | Combination<T>>
}

export function allOf<T>(args: T[]): Combination<T> {
    return {
        combinator: 'and',
        operands: args,
    }
}

export function oneOf<T>(args: T[]): Combination<T> {
    return {
        combinator: 'or',
        operands: args
    }
}

// For syntactical benefit; Really just a special case of `and` and `or`
export const identity = allOf

export function isCombination(args: any): boolean {
    return !!(args["combinator"] && args["operands"])
}

export default Combination


