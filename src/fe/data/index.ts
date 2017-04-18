import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {LanguageTestResult} from "../../definitions/auxillary/LanguageTest"
import {PrereqId} from "../../definitions/Prerequisites/BasePrereq"
import {RegionId} from "../../definitions/auxillary/Region"

export type FilterId =
    "work_experience_duration"
    | "work_experience_region"
    | "education_level"
    | "education_region"
    | "age"
    | "english"

export type FilterOption = {
    id: OptionId
    label: MultiLangStringSet
}

export interface BaseFilter {
    id: FilterId
    filterType: string
    title: MultiLangStringSet
}

export interface MultipleChoiceFilter extends BaseFilter {
    filterType: "multiple-choice"
    options: FilterOption[]
}

export interface RealValueFilter extends BaseFilter {
    filterType: "real",
    defaultValue: number
}

export type Filter =
    MultipleChoiceFilter
    | RealValueFilter

export type OptionId = string

export type EnglishFilterId = "proficient" | "good" | "not_good"

export type EnglishAssumptionSet = {
    [key in EnglishFilterId]: LanguageTestResult[]
}

export const englishTestAssumptions: EnglishAssumptionSet = {
    proficient: [
        {
            testId: "clb",
            scores: {
                listening: 9,
                speaking: 9,
                reading: 9,
                writing: 9,
            }
        },
        {
            testId: "ielts",
            scores: {
                listening: 8,
                speaking: 8,
                reading: 8,
                writing: 8,
            }
        },
        {
            testId: "toefl",
            scores: {
                listening: 28,
                speaking: 28,
                reading: 28,
                writing: 28,
            }
        },
    ] as LanguageTestResult[],
    good: [
        {
            testId: "clb",
            scores: {
                listening: 7,
                speaking: 7,
                reading: 7,
                writing: 7,
            }
        },
        {
            testId: "ielts",
            scores: {
                listening: 7,
                speaking: 7,
                reading: 7,
                writing: 7,
            }
        },
        {
            testId: "toefl",
            scores: {
                listening: 22,
                speaking: 22,
                reading: 22,
                writing: 22,
            }
        },
    ] as LanguageTestResult[],
    not_good: [
        {
            testId: "clb",
            scores: {
                overall: 0,
            }
        },
        {
            testId: "ielts",
            scores: {
                listening: 0,
                speaking: 0,
                reading: 0,
                writing: 0,
            }
        },
        {
            testId: "toefl",
            scores: {
                listening: 0,
                speaking: 0,
                reading: 0,
                writing: 0,
            }
        },
    ] as LanguageTestResult[]
}

interface RegionOption {
    id: RegionId,
    label: MultiLangStringSet
}

const RegionOptions: RegionOption[] = [
    {
        id: "canada",
        label: {
            en: "Canada"
        }
    },
    {
        id: "australia",
        label: {
            en: "Australia"
        }
    },
    {
        id: "world",
        label: {
            en: "Elsewhere"
        }
    },
]

export const filterSets: Filter[] = [
    {
        id: "work_experience_duration",
        filterType: "real",
        title: {
            en: "Work experience in years"
        },
        defaultValue: 1,
    },
    {
        id: "work_experience_region",
        filterType: "multiple-choice",
        title: {
            en: "Work experience: Where?"
        },
        options: RegionOptions,
    },
    {
        id: "education_level",
        filterType: "multiple-choice",
        title: {
            en: "Education: Highest Level"
        },
        options: [
            {
                id: "secondary",
                label: {
                    en: "Secondary"
                }
            },
            {
                id: "bachelor",
                label: {
                    en: "Bachelor"
                }
            },
            {
                id: "master",
                label: {
                    en: "Master"
                }
            },
            {
                id: "phd",
                label: {
                    en: "PhD"
                }
            },
        ]
    },
    {
        id: "education_region",
        filterType: "multiple-choice",
        title: {
            en: "Highest education: Where?"
        },
        options: RegionOptions,
    },
    {
        id: "age",
        filterType: "real",
        title: {
            en: "Age"
        },
        defaultValue: 35,
    },
    {
        id: "english",
        filterType: "multiple-choice",
        title: {
            en: "English"
        },
        options: [
            {
                id: "not_good",
                label: {
                    en: "Not good"
                }
            },
            {
                id: "good",
                label: {
                    en: "Good"
                }
            },
            {
                id: "proficient",
                label: {
                    en: "Proficient"
                }
            },
        ]
    },
]

export type FilterState = {
    [filterId in FilterId]: OptionId | number | null
}
