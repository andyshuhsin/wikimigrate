export interface CountryData {
    id: string
    statusList: Status[]
    transitionList: Transition[]
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
    id: string
    comment: MultiLang<string>
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
}

export interface Transition {
    id: string
    name: MultiLang<string>
    acquireBy: "application" | "automatic"
    from: NationalStatus | NationalStatus[]
    to: NationalStatus
    stage?: {
        comment: MultiLang<string>
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