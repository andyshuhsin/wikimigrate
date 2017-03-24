import { MultiLangStringSet } from '../index'
import URLDatum from './URLDatum'

export type CertificationId = "eca"

export interface Certification {
    type: "certification",
    id: CertificationId
    title: MultiLangStringSet
    titleShort?: MultiLangStringSet
    referenceList?: URLDatum[]
}

export default Certification
