import URLDatum from './URLDatum'
import { MultiLangStringSet } from './MultiLang'

export type CertificationId = 'eca'

export interface Certification {
    type: 'certification',
    id: CertificationId
    title: MultiLangStringSet
    titleShort?: MultiLangStringSet
    reference?: URLDatum
}

export default Certification
