import { Person } from '../../src/definitions/Person'

export type Spec<FirstParamType, SecondParamType, ReturnType> = [
    string,
    FirstParamType,
    SecondParamType,
    ReturnType
]

export function evaluate<A, B, R>(specs: Spec<A, B, R>[], f: (a: A, b: B) => R) {
    for (const spec of specs) {
        const result = f(spec[1], spec[2])
        if (result === spec[3]) {
            console.log(spec[0] + ' passed')
        }
        else {
            console.error(`${spec[0]} failed: expecting ${spec[3]}, getting ${result}`)
        }
    }
}

