import { MultiLangStringSet } from '../MultiLang'
import BasePrereq from './BasePrereq'
import Duration from '../Duration'
import Combination from '../Combination'

export interface WorkExperiencePrereq extends BasePrereq {
    property: "work_experience"
    length?: Duration
    withinLast?: Duration
    workHoursPerWeek?: Duration
    regionId?: string
    jobNature: Combination<any> //TODO: Clarify
}

export default WorkExperiencePrereq
