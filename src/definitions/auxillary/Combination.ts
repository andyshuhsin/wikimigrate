import {MultiLangStringSet} from "./MultiLang"

export type CombinationMeta = Partial<{
    title: MultiLangStringSet

    /*
     Instruct the prerequisite satisfaction calculator that one quality
     can only be used to satisfy one prerequisite.
     For example, Canadian Express Entry offer bonus scores for people
     with dual degrees.
     But someone holding only ONE post-secondary degree can satisfy the
     prerequisite:
         allOf([
           post-secondary,
           post-secondary,
         ])
     Instead, this should be specified as
         allOf([
             post-secondary,
             post-secondary,
         ], {surjective: true})
    */
    surjective: boolean
}>

export interface Combination<T> {
    combinator: "and" | "or" | "not"
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

export function not<T>(args: [T], meta?: CombinationMeta): Combination<T> {
    return {
        combinator: 'not',
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


