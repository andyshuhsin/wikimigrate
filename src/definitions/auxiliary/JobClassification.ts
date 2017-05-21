import { MultiLangStringSet } from './MultiLang'
import URLDatum from './URLDatum'

type ClassificationSystemId = 'noc' | 'aus-job-class'

export interface JobGroup {
    jobGroupId: string
    parentClassificationSystemId: ClassificationSystemId
    specification: string
    description?: MultiLangStringSet
    parentGroup: JobGroup | null
    reference?: URLDatum
}

export function isJobGroup(input: any): boolean {
    return !!(input && input.jobGroupId)
}

export interface JobType {
    jobGroup: Array<JobGroup>
    description: MultiLangStringSet
}

export interface JobClassification {
    classificationSystemId: ClassificationSystemId
    regionId: string
    title: MultiLangStringSet
    titleShort: MultiLangStringSet
    version: string
    jobTypes?: Array<JobType>
    jobGroups: {
        [groupName: string]: JobGroup
    }
    reference: URLDatum
}

export default JobClassification
