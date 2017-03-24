import { MultiLangStringSet } from '../MultiLang'
import BasePrereq from './BasePrereq'
import { JobGroup, JobType } from '../JobClassification'
import Duration from '../Duration'
import { Condition } from '../Combination'

export interface WorkExperiencePrereq extends BasePrereq {
    property: "work_experience"
    length?: Duration
    withinLast?: Duration
    workHoursPerWeek?: Duration
    regionId?: string
    jobNature: Condition<JobGroup | JobType> | MultiLangStringSet
}

export default WorkExperiencePrereq
