import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {CurrencyId} from "../../definitions/auxillary/Money"

type CurrencyDB = {
    [key in CurrencyId]: {
        symbol: string
        code: string
        name: MultiLangStringSet
    }
}

const currencies: CurrencyDB = {
    cad: {
        symbol: "$",
        code: "CAD",
        name: {
            en: "Canadian dollar",
            fr: "Dollar canadien"
        }
    },
    usd: {
        symbol: "$",
        code: "USD",
        name: {
            en: "United States dollar"
        }
    },
    aud: {
        symbol: "$",
        code: "AUD",
        name: {
            en: "Australian dollar"
        }

    }
}

export default currencies
