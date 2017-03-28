import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxillary/MultiLang'
import { CertificationId } from '../auxillary/Certification'
import Duration from '../auxillary/Duration'
import {EducationQuality} from "../Qualities/EducationQuality"

export interface EducationPrereq extends BasePrereq {
    prereqId: "education"
    education: EducationQuality
    graduateNoEarlierThan?: Duration
    description?: MultiLangStringSet
    certification?: CertificationId
}

export default EducationPrereq
