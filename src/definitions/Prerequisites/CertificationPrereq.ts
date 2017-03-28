import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxillary/MultiLang'

export interface CertificationPrereq extends BasePrereq {
    prereqId: "certification"
    description: MultiLangStringSet
}

export default CertificationPrereq
