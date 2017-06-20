import { MultiLangStringSet } from './MultiLang'
export interface Document {
    id: string
    title: MultiLangStringSet
}

export type DocumentRequirementFormat = 'original' | 'copy'

export type Party =
    'principal'
    | 'spouse'
    | 'dependent_child'
    | 'dependent_child_18+'
    | 'dependent_child_18-'

export interface DocumentRequirement {
    document: Document
    description?: MultiLangStringSet
    format: DocumentRequirementFormat
    ifApplicable?: true | undefined
    parties?: Party[]
}
