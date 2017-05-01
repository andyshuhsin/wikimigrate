import {MultiLangStringSet} from "./MultiLang"
export type ArithmeticComparisonOperator = "<" | "<=" | ">" | ">=" | "="

type Scenario = "post"

interface ArithmeticComparisonOperatorProfile {
    description: {
        [key in Scenario]: MultiLangStringSet
    }
}

type ArithmeticComparisonOperatorProfiles = {
    [key in ArithmeticComparisonOperator]: ArithmeticComparisonOperatorProfile
}

export const arithmeticComparisonOperatorProfiles: ArithmeticComparisonOperatorProfiles = {
    "<": {
        description: {
            post: {
                en: "below",
                zh_hans: "以下",
            }
        },
    },
    "<=": {
        description: {
            post: {
                en: "or below",
                zh_hans: "或以下",
            }
        },
    },
    ">": {
        description: {
            post: {
                en: "above",
                zh_hans: "以上",
            }
        },
    },
    ">=": {
        description: {
            post: {
                en: "or above",
                zh_hans: "或以上",
            }
        },
    },
    "=": {
        description: {
            post: {
                en: "",
                zh_hans: "",
            }
        },
    },
}

export type Interval<T> = [ArithmeticComparisonOperator, T]
