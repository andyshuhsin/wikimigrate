import {MultiLangStringSet} from "./MultiLang"

export type CombinationMeta = Partial<{
    title: MultiLangStringSet
}>

export interface Combination<T> {
    combinator: "and" | "or",
    operands: Array<T | Combination<T>>
    meta?: CombinationMeta
}

export function allOf<T>(args: T[], meta?: CombinationMeta): Combination<T> {
    return {
        combinator: 'and',
        operands: args,
        meta,
    }
}

export function oneOf<T>(args: T[], meta?: CombinationMeta): Combination<T> {
    return {
        combinator: 'or',
        operands: args,
        meta
    }
}

// For syntactical benefit; Really just a special case of `and` and `or`
export const identity = allOf

export function isCombination(args: any): boolean {
    return !!(args["combinator"] && args["operands"])
}

export default Combination


