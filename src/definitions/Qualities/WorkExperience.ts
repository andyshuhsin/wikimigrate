import {MultiLangStringSet} from "../auxillary/MultiLang"
import {Duration} from "../auxillary/Duration"
import {RegionId} from "../auxillary/Region"

export interface WorkExperienceQuality {
    qualityId: "work_experience"
    regionId?: RegionId
    duration?: Duration
    description?: MultiLangStringSet
}

export default WorkExperienceQuality
