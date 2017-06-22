import { MultiLangStringSet } from './MultiLang'
import { Money } from './Money'
import { DocumentRequirement } from './Document'
import URLDatum from './URLDatum'
import { Duration } from './Duration'

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

export interface ProcessingTimeStatement {
    duration: Duration
    percentage: number
}

export interface Paperwork {
    procedureList: Procedure[]
    processingTime?: ProcessingTimeStatement[]
}
