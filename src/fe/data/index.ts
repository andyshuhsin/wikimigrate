import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

export type FilterId = "offer" | "education" | "english"

export type FilterOption = {
    id: OptionId
    label: MultiLangStringSet
}

export type Filter = {
    id: FilterId
    title: MultiLangStringSet
    options: FilterOption[]
}

export type OptionId = string

export const filterSets: Filter[] = [
    {
        id: "offer",
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
        title: {
            en: "English"
        },
        options: [
            {
                id: "so good",
                label: {
                    en: "Very good"
                }
            },
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
    }
]

export type FilterState = {
    [filterId in FilterId]: OptionId | null
}
