import { MultiLangStringSet } from '../auxiliary/MultiLang'
import { Duration } from '../auxiliary/Duration'
import { RegionId } from '../auxiliary/Region'

export interface WorkExperienceQuality {
    qualityId: 'work_experience'
    region: RegionId
    duration: Duration
    description?: MultiLangStringSet
}

export default WorkExperienceQuality
