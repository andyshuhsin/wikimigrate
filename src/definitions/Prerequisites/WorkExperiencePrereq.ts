import { MultiLangStringSet } from '../auxillary/MultiLang'
import BasePrereq from './BasePrereq'
import { JobGroup, JobType } from '../auxillary/JobClassification'
import Duration from '../auxillary/Duration'
import { Combination } from '../auxillary/Combination'
import {Interval} from "../auxillary/Operator"
import {RegionId} from "../auxillary/Region"

export interface WorkExperiencePrereq extends BasePrereq {
    prereqId: "work_experience"
    length?: Interval<Duration>
    withinLast?: Duration
    workHoursPerWeek?: Duration
    region?: RegionId
    regionsExcept?: RegionId
    jobNature: Combination<JobGroup | JobType> | MultiLangStringSet
}

export default WorkExperiencePrereq
