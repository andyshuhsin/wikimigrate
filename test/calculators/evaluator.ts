import { Person } from '../../src/definitions/Person'

export type Spec<SecondParamType> = [
    string,
    Person,
    SecondParamType,
    boolean
]

export function evaluate<T>(specs: Spec<T>[], f: (person: Person, prereq: T) => boolean) {
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

