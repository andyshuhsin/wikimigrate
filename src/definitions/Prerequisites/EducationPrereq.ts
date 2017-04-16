import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxillary/MultiLang'
import { CertificationId } from '../auxillary/Certification'
import {EducationQuality} from "../Qualities/EducationExperience"
import {Duration} from "../auxillary/Duration"

export interface EducationPrereq extends BasePrereq {
    prereqId: "education"
    education: EducationQuality
    otherEducations?: EducationQuality[] // e.g. Required to have two degrees at the same time
    description?: MultiLangStringSet
    certification?: CertificationId
    graduateNoEarlierThan?: Duration
    minDuration?: Duration
}

export default EducationPrereq
