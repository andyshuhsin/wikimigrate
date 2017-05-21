import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxiliary/MultiLang'
import { CertificationId } from '../auxiliary/Certification'
import { EducationStage } from '../Qualities/EducationExperience'
import { Duration } from '../auxiliary/Duration'
import { Interval } from '../auxiliary/Operator'
import { RegionId } from '../auxiliary/Region'

export interface EducationPrereq extends BasePrereq {
    prereqId: 'education'
    stage: Interval<EducationStage> | null
    region: RegionId
    description?: MultiLangStringSet
    duration?: Interval<Duration>
    graduateWithin?: Duration
    certification?: CertificationId
}

export default EducationPrereq
