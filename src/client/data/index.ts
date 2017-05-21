import { LangId, MultiLangStringSet } from '../../definitions/auxiliary/MultiLang'
import { LanguageTestResult } from '../../definitions/auxiliary/LanguageTest'
import { RegionId } from '../../definitions/auxiliary/Region'

export type FilterId =
    'work_experience_duration'
    | 'work_experience_region'
    | 'education_level'
    | 'education_region'
    | 'age'
    | 'english'
    | 'french'
    | 'app_lang'

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
    filterType: 'multiple-choice'
    options: FilterOption[]
}

export interface RealValueFilter extends BaseFilter {
    filterType: 'real',
    defaultValue: number
}

export type Filter =
    MultipleChoiceFilter
    | RealValueFilter

export type OptionId = string

export type LanguageFilterId = 'proficient' | 'good' | 'not_good'

export type LanguageFilterAssumptions = {
    [key in LanguageFilterId]: LanguageTestResult[]
    }

const englishTestAssumptions: LanguageFilterAssumptions = {
    proficient: [
        {
            testId: 'clb',
            language: 'en',
            scores: {
                listening: 11,
                speaking: 11,
                reading: 11,
                writing: 11,
            },
        },
        // {
        //     testId: "ielts",
        //     language: "en",
        //     scores: {
        //         listening: 8,
        //         speaking: 8,
        //         reading: 8,
        //         writing: 8,
        //     }
        // },
        // {
        //     testId: "toefl",
        //     language: "en",
        //     scores: {
        //         listening: 28,
        //         speaking: 28,
        //         reading: 28,
        //         writing: 28,
        //     }
        // },
    ] as LanguageTestResult[],
    good: [
        {
            testId: 'clb',
            language: 'en',
            scores: {
                listening: 9,
                speaking: 7,
                reading: 9,
                writing: 9,
            },
        },
    ] as LanguageTestResult[],
    not_good: [
        {
            testId: 'clb',
            language: 'en',
            scores: {
                listening: 0,
                speaking: 0,
                reading: 0,
                writing: 0,
            },
        },
    ] as LanguageTestResult[],
}

const frenchTestAssumptions: LanguageFilterAssumptions = {
    proficient: [
        {
            testId: 'clb',
            language: 'fr',
            scores: {
                listening: 11,
                speaking: 11,
                reading: 11,
                writing: 11,
            },
        },
    ] as LanguageTestResult[],
    good: [
        {
            testId: 'clb',
            language: 'fr',
            scores: {
                listening: 9,
                speaking: 9,
                reading: 9,
                writing: 9,
            },
        },
    ] as LanguageTestResult[],
    not_good: [
        {
            testId: 'clb',
            language: 'fr',
            scores: {
                listening: 0,
                speaking: 0,
                reading: 0,
                writing: 0,
            },
        },
    ] as LanguageTestResult[],

}

type LanguageAssumptionSet = {
    [key in LangId]?: LanguageFilterAssumptions
    }

export const languageAssumptionSet: LanguageAssumptionSet = {
    en: englishTestAssumptions,
    fr: frenchTestAssumptions,
}

interface RegionOption {
    id: RegionId,
    label: MultiLangStringSet
}

const RegionOptions: RegionOption[] = [
    {
        id: 'new_zealand',
        label: {
            en: 'New Zealand',
            zh_hans: '新西兰',
        },
    },
    {
        id: 'australia',
        label: {
            en: 'Australia',
            zh_hans: '澳大利亚',
        },
    },
    {
        id: 'canada',
        label: {
            en: 'Canada',
            zh_hans: '加拿大',
        },
    },
    {
        id: 'world',
        label: {
            en: 'Elsewhere',
            zh_hans: '其他',
        },
    },
]

export const DEFAULT_AGE = 35

export const filterSets: Filter[] = [
    {
        id: 'work_experience_duration',
        filterType: 'real',
        title: {
            en: 'Work experience in years',
            zh_hans: '工作经验（年）',
        },
        defaultValue: 1,
    },
    {
        id: 'work_experience_region',
        filterType: 'multiple-choice',
        title: {
            en: 'Work experience: Where?',
            zh_hans: '工作经验：地点',
        },
        options: RegionOptions,
    },
    {
        id: 'education_level',
        filterType: 'multiple-choice',
        title: {
            en: 'Education: Highest Level',
            zh_hans: '最高学历',
        },
        options: [
            {
                id: 'secondary',
                label: {
                    en: 'Secondary',
                    zh_hans: '高中',
                },
            },
            {
                id: 'bachelor',
                label: {
                    en: 'Bachelor',
                    zh_hans: '本科',
                },
            },
            {
                id: 'master',
                label: {
                    en: 'Master',
                    zh_hans: '硕士',
                },
            },
            {
                id: 'phd',
                label: {
                    en: 'PhD',
                    zh_hans: '博士',
                },
            },
        ],
    },
    {
        id: 'education_region',
        filterType: 'multiple-choice',
        title: {
            en: 'Highest education: Where?',
            zh_hans: '最高学历取得地',
        },
        options: RegionOptions,
    },
    {
        id: 'age',
        filterType: 'real',
        title: {
            en: 'Age',
            zh_hans: '年龄',
        },
        defaultValue: DEFAULT_AGE,
    },
    {
        id: 'english',
        filterType: 'multiple-choice',
        title: {
            en: 'English',
            zh_hans: '英语能力',
        },
        options: [
            {
                id: 'not_good',
                label: {
                    en: 'Not good',
                    zh_hans: '不行',
                },
            },
            {
                id: 'good',
                label: {
                    en: 'Good',
                    zh_hans: '挺好',
                },
            },
            {
                id: 'proficient',
                label: {
                    en: 'Proficient',
                    zh_hans: '流利',
                },
            },
        ],
    },
    {
        id: 'french',
        filterType: 'multiple-choice',
        title: {
            en: 'French',
            zh_hans: '法语能力',
        },
        options: [
            {
                id: 'not_good',
                label: {
                    en: 'Not good',
                    zh_hans: '不行',
                },
            },
            {
                id: 'good',
                label: {
                    en: 'Good',
                    zh_hans: '挺好',
                },
            },
            {
                id: 'proficient',
                label: {
                    en: 'Proficient',
                    zh_hans: '流利',
                },
            },
        ],
    },
    {
        id: 'app_lang',
        filterType: 'multiple-choice',
        title: {
            en: 'Choose App Language',
            zh_hans: '选择语言',
        },
        options: [
            {
                id: 'en',
                label: {
                    en: 'English',
                },
            },
            {
                id: 'zh_hans',
                label: {
                    zh_hans: '简体中文',
                },
            },
        ],
    },
]

export type FilterState = {
    [filterId in FilterId]: OptionId | number | null
}
