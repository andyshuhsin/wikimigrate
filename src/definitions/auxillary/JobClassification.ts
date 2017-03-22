import { CountryId } from '../Country'
import { MultiLangStringSet } from '../index'

interface JobType {
    description: MultiLangStringSet
}

interface JobGroup {
    primaryGroupLevel: string
    secondaryGroupLevel?: string
    jobTypes: Array<JobType>
}

interface JobClassification {
    regionId: string
    title: MultiLangStringSet
    titleShort: MultiLangStringSet
    version: string
    jobGroups: JobGroup[]
}

export default JobClassification
