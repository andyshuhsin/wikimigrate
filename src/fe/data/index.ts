import {MultiLangStringSet} from "../../definitions";

export type FilterId = "offer" | "education" | "english"

export type FilterState = {
    [key in FilterId]: string
}

export type Filter = {
    id: FilterId
    title: MultiLangStringSet
    options: MultiLangStringSet[]
}

export const filterSets: Filter[] = [
    {
        id: "offer",
        title: {
            en: "Job Offer"
        },
        options: [
            {
                en: "yes"
            },
            {
                en: "no"
            }
        ]
    },
    {
        id: "education",
        title: {
            en: "Education"
        },
        options: [
            {
                en: "university",
            },
            {
                en: "secondary",
            },
            {
                en: "primary",
            }
        ]
    }
]
