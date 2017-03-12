export interface CountryData {
    id: string
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
}

export interface MultiLang<T> {
    [lang: string]: T
}

export type Duration = {
    [unit: string]: number
}

export interface Status {
    id: string
    name: MultiLang<string>
    rights: string[]
    duration?: Duration
}

export type NationalStatus = {
    countryId: string
    statusId: string
}

export function ns(countryId: string, statusId: string): NationalStatus {
    return {
        countryId,
        statusId,
    }
}

export interface Prerequisite {
    property: string
    description?: MultiLang<string>
}

export interface AgePrereq extends Prerequisite {
    property: "age"
    value: Duration
    operator: "<" | "<=" | ">" | ">="
}

type LanguageBenchmarkId = "clb" | "nclc" | "ielts" | "toefl"

type LanguageBenchmarkProfile = {
    id: LanguageBenchmarkId
    title: MultiLang<string>
}

const languageBenchmarkProfiles: LanguageBenchmarkProfile[] = [
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
    }
]

type LanguageTestItem = "listening" | "speaking" | "reading" | "writing" 

export interface LanguageBenchamrkPrereq extends Prerequisite {
    property: "language_test"
    benchmark: LanguageBenchmarkId
    requirements: any[] //TODO: Use proper type
}

export interface JobType {
    description: MultiLang<string>
    //TODO: Expand
}

export interface WorkExperiencePrereq extends Prerequisite {
    property: "work_experience"
    length: Duration
    withinLast: Duration
    workHoursPerWeek: Duration
    jobType: JobType
}

export interface EducationPrereq extends Prerequisite {
    property: "education"
    stage: "primary" | "secondary" | "post-secondary"
    regionId: string | undefined
    description: MultiLang<string>
    certification?: "eca"  //TODO: Elaborate on Educational Credential Assessment
}

export type CurrencyId = "cad" | "usd"

export type Money = {
    value: number
    currencyId: CurrencyId
}

export interface FundPrereq extends Prerequisite {
    property: "fund"
    type: "possess" | "invest" | "donate"
    schemes: [
        {
            condition: {
                familyMember?: number
            }
            fund: Money
        }
    ]
}

export function money(value: number, currencyId: CurrencyId): Money {
    return {
        value,
        currencyId
    }
}

export interface OfferPrereq extends Prerequisite {
    property: "offer"
    employer: {
        regionId: string | undefined
    }
}

export interface rightPrereq extends Prerequisite {
    property: "right"
    regionId: string
    rightId: string
}

export interface CertificationPrereq extends Prerequisite {
    property: "certification"
    description: MultiLang<string>
}


//TODO: Prerequisite need fixing

export interface Effect {
    property: string | 'DQ' // disqualified
    value: any
}

export interface Exception {
    appliedTo: NationalStatus[]
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
    acquireBy: "application" | "invitation" | "automatic"
    from: NationalStatus | NationalStatus[]
    to: NationalStatus
    stage?: {
        description: MultiLang<string>
        date?: Date
    }
    prerequisiteList: Combination<any> //TODO: Should refer to Prerequisite
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