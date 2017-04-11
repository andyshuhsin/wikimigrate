import { MultiLangStringSet } from '../auxillary/MultiLang'
import BasePrereq from './BasePrereq'
import { JobGroup, JobType } from '../auxillary/JobClassification'
import Duration from '../auxillary/Duration'
import { Combination } from '../auxillary/Combination'

export interface WorkExperiencePrereq extends BasePrereq {
    prereqId: "work_experience"
    length?: Duration
    withinLast?: Duration
    workHoursPerWeek?: Duration
    regionId?: string
    jobNature: Combination<JobGroup | JobType> | MultiLangStringSet
}

export default WorkExperiencePrereq
