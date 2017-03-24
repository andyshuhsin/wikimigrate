import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../MultiLang'
import { CertificationId } from '../Certification'

export interface EducationPrereq extends BasePrereq {
    property: "education"
    stage: "primary" | "secondary" | "post-secondary"
    regionId: string | undefined
    description: MultiLangStringSet
    certification?: CertificationId
}

export default EducationPrereq
