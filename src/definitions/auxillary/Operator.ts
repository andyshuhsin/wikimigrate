import {MultiLangStringSet} from "./MultiLang"
export type ArithmeticComparisonOperator = "<" | "<=" | ">" | ">=" | "="

type Scenario = "education"

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
            education: {
                en: "below",
                zh_hans: "以下",
            }
        },
    },
    "<=": {
        description: {
            education: {
                en: "below or equal to",
                zh_hans: "或以下",
            }
        },
    },
    ">": {
        description: {
            education: {
                en: "above",
                zh_hans: "以上",
            }
        },
    },
    ">=": {
        description: {
            education: {
                en: "or above",
                zh_hans: "或以上",
            }
        },
    },
    "=": {
        description: {
            education: {
                en: "",
                zh_hans: "",
            }
        },
    },
}

export type Interval<T> = [ArithmeticComparisonOperator, T]
