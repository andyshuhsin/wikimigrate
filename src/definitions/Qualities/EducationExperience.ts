import {LangId, MultiLangStringSet} from "../auxillary/MultiLang"
import Duration from "../auxillary/Duration"
import {RegionId} from "../auxillary/Region"
import {text} from "../../client/utils/text"

export type EducationStage =
    "primary"
    | "secondary"
    | "bachelor"
    | "master"
    | "phd"
    | "professional"

interface EducationStageProfile {
    rank: number
    name: MultiLangStringSet
}

export type EducationStageProfiles = {
    [key in EducationStage]: EducationStageProfile
}

export const educationStageProfiles: EducationStageProfiles = {
    primary: {
        rank: 1,
        name: {
            en: "Primary",
            zh_hans: "小学",
        },
    },
    secondary: {
        rank: 2,
        name: {
            en: "Secondary",
            zh_hans: "中学",
        },
    },
    bachelor: {
        rank: 3,
        name: {
            en: "Bachelor",
            zh_hans: "本科",
        },
    },
    master: {
        rank: 4,
        name: {
            en: "master",
            zh_hans: "硕士",
        },
    },
    phd: {
        rank: 5,
        name: {
            en: "PhD",
            zh_hans: "博士",
        },
    },
    professional: {
        rank: -1,
        name: {
            en: "Professional",
            zh_hans: "职业教育",
        },
    }
}

export function getEducationStageRank(stage: EducationStage): number {
    return educationStageProfiles[stage].rank
}

export interface EducationQuality {
    qualityId: "education"
    stage: EducationStage | undefined
    regionId: RegionId | undefined
    duration?: Duration
    description?: MultiLangStringSet
    gradutaionDate?: Date
}

export default EducationQuality

