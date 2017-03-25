import { MultiLangStringSet } from '../index'

export interface JobGroup {
    id: string
    description?: MultiLangStringSet
    parentGroup: JobGroup | null
}

export interface JobType {
    jobGroup: Array<JobGroup>
    description: MultiLangStringSet
}

export interface JobClassification {
    regionId: string
    title: MultiLangStringSet
    titleShort: MultiLangStringSet
    version: string
    jobTypes?: Array<JobType>
    jobGroups: {
        [groupName: string]: JobGroup
    }
}

export default JobClassification
