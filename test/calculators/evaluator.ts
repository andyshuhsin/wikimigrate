export type Spec<ParamTypes extends any[], ReturnType> = [
    string,
    ParamTypes,
    ReturnType
]

export function evaluate<P extends any[], R>(
    specs: Spec<P, R>[],
    f: (...args: any[] /* should be P; TypeScript disallows */) => R
) {
    for (const spec of specs) {
        const [
            description,
            params,
            expectation,
        ] = spec
        const result = f.apply(null, params)
        if (result === expectation) {
            console.log(`[passed] ${description}`)
        }
        else {
            console.error(`[failed] ${description}: expecting ${expectation}, getting ${result}`)
        }
    }
}

