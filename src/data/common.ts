export interface CountryData {
    id: string
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
}

export interface MultiLang<T> {
    [lang: string]: T
}

type DurationUnit = "year" | "month" | "week" | "day" | "hour"

export type Duration = {
    unit: DurationUnit
    value: number
}

export function duration(value: number, unit: DurationUnit): Duration {
    return {
        unit,
        value,
    }
}

export interface Status {
    id: string
    regionId: string
    name: MultiLang<string>
    rights: string[]
    duration?: Duration
}

export interface BasePrerequisite {
    property: string
    description?: MultiLang<string>
}

export interface AgePrereq extends BasePrerequisite {
    property: "age"
    value: Duration
    operator: "<" | "<=" | ">" | ">="
}

type LanguageBenchmarkId = "clb" | "nclc" | "ielts" | "toefl" | "oet" | "pte-academic" | "cae"

type LanguageBenchmarkProfile = {
    id: LanguageBenchmarkId
    title: MultiLang<string>
}

export const languageBenchmarkProfiles: LanguageBenchmarkProfile[] = [
    {
        id: "clb",
        title: {
            en: "Canadian Language Benchmark"
        }
    },
    {
        id: "nclc",
        title: {
            fr: "Niveaux de compétence linguistique canadiens"
        }
    },
    {
        id: "ielts",
        title: {
            en: "International English Language Testing System"
        }
    },
    {
        id: "toefl",
        title: {
            en: "Test of English as a Foreign Language"
        }
    },
    {
        id: "pte-academic",
        title: {
            en: "Pearson Test of English"
        }
    },
    {
        id: "cae",
        title: {
            en: "Cambridge English: Advanced"
        }
    }
]

type LanguageTestItem = "listening" | "speaking" | "reading" | "writing" 

export interface LanguageBenchamrkPrereq extends BasePrerequisite {
    property: "language_test"
    benchmark: LanguageBenchmarkId
    requirements: any[] //TODO: Use proper type
    // TODO: Add time limits
}

export interface JobType {
    description: MultiLang<string>
    //TODO: Expand
}

export interface WorkExperiencePrereq extends BasePrerequisite {
    property: "work_experience"
    length?: Duration
    withinLast?: Duration
    workHoursPerWeek?: Duration
    regionId?: string
    jobTypes?: Combination<any> //TODO: Clarify
}

export interface EducationPrereq extends BasePrerequisite {
    property: "education"
    stage: "primary" | "secondary" | "post-secondary"
    regionId: string | undefined
    description: MultiLang<string>
    certification?: "eca"  //TODO: Elaborate on Educational Credential Assessment
}

export type CurrencyId = "cad" | "usd" | "aud"

export type Money = {
    value: number
    currencyId: CurrencyId
}

export interface FundPrereq extends BasePrerequisite {
    property: "fund"
    type: "possess" | "invest" | "donate" | "venture"
    schemes: [
        {
            condition?: {
                familyMember?: number
            }
            fund: Money
        }
    ]
}

export interface BusinessPrereq extends BasePrerequisite {
    property: "business"
    schemes: [
        {
            condition: {
                turnover?: Money
                duration: Duration
            }
        }
    ]
}

export function money(value: number, currencyId: CurrencyId): Money {
    return {
        value,
        currencyId
    }
}

export interface OfferPrereq extends BasePrerequisite {
    property: "offer"
    employer: {
        regionId: string | undefined
        status?: "approved"
    }
}

export interface RightPrereq extends BasePrerequisite {
    property: "right"
    regionId: string
    rightId: string
}

export interface CertificationPrereq extends BasePrerequisite {
    property: "certification"
    description: MultiLang<string>
}

export type Prerequisite = 
    AgePrereq
    | LanguageBenchamrkPrereq
    | WorkExperiencePrereq
    | EducationPrereq
    | FundPrereq
    | BusinessPrereq
    | OfferPrereq
    | RightPrereq
    | CertificationPrereq


//TODO: Prerequisite need fixing

export interface Effect {
    property: string | 'DQ' // disqualified
    value: any
}

export interface Exception {
    appliedTo: Status[]
    effects: Effect[]
}

export interface URLDatum {
    title: MultiLang<string>
    url: string
}

export interface Procedure {
    name: MultiLang<string>
    description?: MultiLang<string>
}

export interface Transition {
    id: string
    name: MultiLang<string>
    regionId: string,
    acquireBy: "application" | "invitation" | "automatic"
    from: Status | Status[] | null
    to: Status
    stage?: {
        description: MultiLang<string>
        date?: Date
    }
    prerequisiteList: Combination<any> | any //TODO: Should refer to Prerequisite
    procedureList: Procedure[]
    exceptionList?: Array<Exception>
    referenceList?:  URLDatum[]
}

export type Combination<T> = {
    operator: 'and' | 'or',
    operands: T
}

export function allOf<T>(args: T): Combination<T> {
    return {
        operator: 'and',
        operands: args
    }
}

export function oneOf<T>(args: T): Combination<T> {
    return {
        operator: 'or',
        operands: args
    }
}