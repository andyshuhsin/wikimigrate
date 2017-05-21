import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxiliary/MultiLang'

export interface CertificationPrereq extends BasePrereq {
    prereqId: 'certification'
    description: MultiLangStringSet
}

export default CertificationPrereq
