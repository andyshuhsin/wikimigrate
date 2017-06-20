import { MultiLangStringSet } from './MultiLang'
import { Money } from './Money'
import { Combination } from './Combination'
import { DocumentRequirement } from './Document'
import URLDatum from './URLDatum'

export interface Procedure {
    id: string
    name: MultiLangStringSet
    instruction?: {
        text?: MultiLangStringSet
        link?: URLDatum
    }
    cost?: Money
    documentRequirements?: DocumentRequirement[]
}
