import { LangId, MultiLangStringSet } from '../../definitions/auxiliary/MultiLang'
import { RegionId } from '../../definitions/auxiliary/Region'
import { EducationStage } from '../../definitions/Qualities/EducationExperience'

export type SpecifierId =
    'work_experience'
    | 'education'
    | 'age'
    | 'language'
    | 'location'
    | 'duration'

export type SpecifierChoice = {
    id: OptionId
    label: MultiLangStringSet
}

export type SpecifierType = 'multiple-choice' | 'integer' | 'list'

export interface BaseSpecifier {
    id: SpecifierId
    type: SpecifierType
    title: MultiLangStringSet
}

export interface MultipleChoiceSpecifier extends BaseSpecifier {
    type: 'multiple-choice'
    options: SpecifierChoice[]
}

export interface IntegerSpecifier extends BaseSpecifier {
    type: 'integer'
    defaultValue: number
    min?: number
    max?: number
}

export interface ListSpecifier extends BaseSpecifier {
    type: 'list'
    items: Specifier[]
}

export type Specifier =
    ListSpecifier
    | MultipleChoiceSpecifier
    | IntegerSpecifier

export type OptionId = string

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

interface EducationOption {
    id: EducationStage,
    label: MultiLangStringSet
}

export const educationOptions: EducationOption[] = [
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
]

const durationItem: IntegerSpecifier = {
    id: 'duration',
    type: 'integer',
    title: {
        en: 'Duration'
    },
    defaultValue: 1,
    min: 0,
}

const locationItem: MultipleChoiceSpecifier = {
    id: 'location',
    type: 'multiple-choice',
    title: {
        en: 'Location',
        zh_hans: '地点',
    },
    options: RegionOptions
}

export const specifiers: Specifier[] = [
    {
        id: 'work_experience',
        type: 'list',
        title: {
            en: 'Work experience',
            zh_hans: '工作经验',
        },
        items: [durationItem, locationItem],
    },
    {
        id: 'education',
        type: 'list',
        title: {
            en: 'Education',
            zh_hans: '最高学历',
        },
        items: [durationItem, locationItem],
        options: educationOptions,
    },
    {
        id: 'language',
        type: 'list',
        title: {
            en: 'Language',
            zh_hans: '语言',
        },
        items: [durationItem, locationItem],
    },
    {
        id: 'age',
        type: 'integer',
        title: {
            en: 'Age',
            zh_hans: '年龄',
        },
        defaultValue: DEFAULT_AGE,
        min: 0,
    },
]
