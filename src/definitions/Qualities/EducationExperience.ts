import { MultiLangStringSet } from "../auxillary/MultiLang"
import Duration from "../auxillary/Duration"
import {RegionId} from "../auxillary/Region"

type EducationStage = "primary" | "secondary" | "post-secondary"

export interface EducationQuality {
    qualityId: "education"
    stage: EducationStage | undefined
    regionId: RegionId | undefined
    duration?: Duration,
    description?: MultiLangStringSet
}

export default EducationQuality
