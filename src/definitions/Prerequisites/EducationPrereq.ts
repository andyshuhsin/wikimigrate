import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxillary/MultiLang'
import { CertificationId } from '../auxillary/Certification'
import {EducationStage} from "../Qualities/EducationExperience"
import {Duration} from "../auxillary/Duration"
import {Interval} from "../auxillary/Operator"
import {RegionId} from "../auxillary/Region"

export interface EducationPrereq extends BasePrereq {
    prereqId: "education"
    stage: Interval<EducationStage> | null
    region: RegionId
    description?: MultiLangStringSet
    duration?: Interval<Duration>
    graduateWithin?: Duration
    certification?: CertificationId
}

export default EducationPrereq
