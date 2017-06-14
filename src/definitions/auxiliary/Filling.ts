import { MultiLangStringSet } from './MultiLang'

export interface Procedure {
    id: string
    name: MultiLangStringSet
    description?: MultiLangStringSet
}
