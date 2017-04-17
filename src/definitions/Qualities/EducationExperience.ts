import { MultiLangStringSet } from "../auxillary/MultiLang"
import Duration from "../auxillary/Duration"
import {RegionId} from "../auxillary/Region"

export type EducationStage =
    "primary"
    | "secondary"
    | "bachelor"
    | "master"
    | "phd"
    | "professional"

export interface EducationQuality {
    qualityId: "education"
    stage: EducationStage | undefined
    regionId: RegionId | undefined
    duration?: Duration
    description?: MultiLangStringSet
    gradutaionDate?: Date
}

export default EducationQuality
