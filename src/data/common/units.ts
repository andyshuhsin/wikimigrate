import {DurationUnit} from "../../definitions/auxiliary/Duration"
import {MultiLangStringSet} from "../../definitions/auxiliary/MultiLang"

type UnitsTable = {
    [key in DurationUnit]: {
        name: MultiLangStringSet
    }
}

export const units: UnitsTable = {
    year: {
        name: {
            en: "year",
            zh_hans: "年",
        },
    },
    month: {
        name: {
            en: "month",
            zh_hans: "月",
        },
    },
    day: {
        name: {
            en: "day",
            zh_hans: "日",
        },
    },
    week: {
        name: {
            en: "week",
            zh_hans: "周",
        },
    },
    hour: {
        name: {
            en: "hour",
            zh_hans: "小时",
        },
    },
}
