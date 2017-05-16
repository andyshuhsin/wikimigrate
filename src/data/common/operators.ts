import {Combinator} from "../../definitions/auxiliary/Combination"
import {MultiLangStringSet} from "../../definitions/auxiliary/MultiLang"

type OperatorTable = {
    [key in Combinator]: {
        name: MultiLangStringSet
    }
}

export const operators: OperatorTable = {
    and: {
        name: {
            en: "and",
            zh_hans: "和",
        }
    },
    or: {
        name: {
            en: "or",
            zh_hans: "或",
        }
    },
    not: {
        name: {
            en: "not",
            zh_hans: "非",
        }
    }
}
