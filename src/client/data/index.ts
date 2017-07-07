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

export const activeRegionOptions: RegionId[] = [
    'australia',
    'canada',
    'new_zealand',
    'usa',
]

export const DEFAULT_AGE = 35
