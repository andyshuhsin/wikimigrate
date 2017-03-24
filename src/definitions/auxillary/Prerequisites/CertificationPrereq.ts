import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../MultiLang'

export interface CertificationPrereq extends BasePrereq {
    property: "certification"
    description: MultiLangStringSet
}

export default CertificationPrereq
