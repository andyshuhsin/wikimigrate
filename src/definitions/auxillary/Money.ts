import URLDatum from "./URLDatum"
import {MultiLangStringSet} from "./MultiLang"

export type CurrencyId = "cad" | "usd" | "aud"

export type FundSourceId =
    // Canada
    "bdc"
    | "relay"
    | "celtic"
    | "dri"
    | "extreme"
    | "golden"
    | "inovia"
    | "lumira"
    | "mobio"
    | "new-brunswick"
    | "oak-mason"
    | "omers"
    | "pangaea"
    | "priveq"
    | "quorum"
    | "real"
    | "rho-canada"
    | "rogers"
    | "summerhill"
    | "tandem"
    | "top-renergy"
    | "vanedge"
    | "version-one"
    | "wellington"
    | "westcap"
    | "yaletown"

export interface FundSource {
    fundSourceId: FundSourceId
    name: MultiLangStringSet
    reference: URLDatum
}

export type FundSourceGroupId =
    "canada-designated-venture-capital-funds"
    | "canada-designated-angel-investor-groups"
    | "canada-designated-business-incubators"

export interface FundSourceGroup {
    fundSourceGroupId: FundSourceGroupId
    sources: FundSource[]
    reference: URLDatum
}


export type Money = {
    value: number
    currencyId: CurrencyId
}

export function money(value: number, currencyId: CurrencyId): Money {
    return {
        value,
        currencyId
    }
}

export default Money
