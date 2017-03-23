export interface Combination<T> {
    type: "combination",
    operator: 'and' | 'or',
    operands: Array<T | Combination<T>>
}

// If there is only one requirement, user should be be forced to use combination 
export type Condition<T> = Combination<T> | T

export function allOf<T>(args: T[]): Combination<T> {
    return {
        type: "combination",
        operator: 'and',
        operands: args
    }
}

export function oneOf<T>(args: T[]): Combination<T> {
    return {
        type: "combination",
        operator: 'or',
        operands: args
    }
}

export default Combination


