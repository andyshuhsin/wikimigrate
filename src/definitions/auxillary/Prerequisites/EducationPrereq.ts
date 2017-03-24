import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../MultiLang'
import { CertificationId } from '../Certification'
import Duration from '../Duration'

export interface EducationPrereq extends BasePrereq {
    property: "education"
    stage: "primary" | "secondary" | "post-secondary" | undefined
    regionId: string | undefined
    duration?: Duration,
    graduateNoEarlierThan?: Duration
    description?: MultiLangStringSet
    certification?: CertificationId
}

export default EducationPrereq
