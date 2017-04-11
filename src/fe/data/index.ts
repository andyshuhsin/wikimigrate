import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {LanguageTestResult} from "../../definitions/auxillary/LanguageTest"

export type FilterId = "offer" | "education" | "english"

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
}

export type Filter =
    BaseFilter
    | MultipleChoiceFilter
    | RealValueFilter

export type OptionId = string

// "clb" | "nclc" | "ielts" | "toefl" | "oet" | "pte-academic" | "cae"

export const englishTestAssumptions = {
    good: [
        {
            testId: "clb",
            scores: {
                overall: 8,
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
    bad: [
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
    ]
}

export const filterSets: Filter[] = [
    {
        id: "offer",
        filterType: "multiple-choice",
        title: {
            en: "Job Offer"
        },
        options: [
            {
                id: "yes",
                label: {
                    en: "Yes"
                }
            },
            {
                id: "no",
                label: {
                    en: "No"
                }
            },
        ]
    },
    {
        id: "education",
        filterType: "multiple-choice",
        title: {
            en: "Education"
        },
        options: [
            {
                id: "university",
                label: {
                    en: "University"
                }
            },
            {
                id: "secondary",
                label: {
                    en: "Secondary"
                }
            },
            {
                id: "primary",
                label: {
                    en: "Primary"
                }
            },
        ]
    },
    {
        id: "english",
        filterType: "multiple-choice",
        title: {
            en: "English"
        },
        options: [
            {
                id: "good",
                label: {
                    en: "Good"
                }
            },
            {
                id: "not good",
                label: {
                    en: "Not good"
                }
            }
        ]
    },
]

export type FilterState = {
    [filterId in FilterId]: OptionId | null
}
