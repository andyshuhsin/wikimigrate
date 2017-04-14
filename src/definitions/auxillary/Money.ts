import URLDatum from "./URLDatum"
import {MultiLangStringSet} from "./MultiLang"

export type CurrencyId = "cad" | "usd" | "aud"

export type FundSourceId =
    // Canada venture capitals
    "bdc"
    | "relay"
    | "celtic"
    | "dri"
    | "extreme-venture"
    | "golden-opportunities"
    | "inovia"
    | "lumira"
    | "mobio"
    | "new-brunswick"
    | "oak-mason" // also angel
    | "omers"
    | "pangaea"
    | "priveq"
    | "quorum"
    | "real-ventures"
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

    // Canada angels
    | "angel-one"
    | "first-angel"
    | "golden-triangle"
    | "oak-mason"  // also venture
    | "tenx-angel"
    | "vantec-angel"

    // Canada incubators
    | "highline"
    | "communitech"
    | "empowered"
    | "extreme-innovations"
    | "incubes"
    | "innovacorp"
    | "innovate"
    | "interactive"
    | "knowledge"
    | "launchpad"
    | "real-investment"
    | "ryerson"
    | "toronto"
    | "waterloo"


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
