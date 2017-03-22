export type Combination<T> = {
    operator: 'and' | 'or',
    operands: T
}

export function allOf<T>(args: T): Combination<T> {
    return {
        operator: 'and',
        operands: args
    }
}

export function oneOf<T>(args: T): Combination<T> {
    return {
        operator: 'or',
        operands: args
    }
}

export default Combination