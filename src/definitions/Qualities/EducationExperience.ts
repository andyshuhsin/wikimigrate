import { MultiLangStringSet } from '../auxiliary/MultiLang'
import Duration from '../auxiliary/Duration'
import { RegionId } from '../auxiliary/Region'
import { SafeDate } from '../auxiliary/SafeDate'

export type EducationStage =
    'primary'
    | 'secondary'
    | 'diploma'
    | 'bachelor'
    | 'master'
    | 'phd'
    | 'professional'

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
            en: 'Primary',
            zh_hans: '小学',
        },
    },
    secondary: {
        rank: 2,
        name: {
            en: 'Secondary',
            zh_hans: '中学',
        },
    },
    diploma: {
        rank: 3,
        name: {
            en: 'Diploma',
            zh_hans: '证书课程',
        }
    },
    bachelor: {
        rank: 4,
        name: {
            en: 'Bachelor',
            zh_hans: '本科',
        },
    },
    master: {
        rank: 5,
        name: {
            en: 'Master',
            zh_hans: '硕士',
        },
    },
    phd: {
        rank: 6,
        name: {
            en: 'PhD',
            zh_hans: '博士',
        },
    },
    professional: {
        rank: -1,
        name: {
            en: 'Professional',
            zh_hans: '职业教育',
        },
    },
}

export function getEducationStageRank(stage: EducationStage): number {
    return educationStageProfiles[stage].rank
}

export interface EducationQuality {
    qualityId: 'education'
    stage: EducationStage | undefined
    region: RegionId | undefined
    duration: Duration
    graduationDate: SafeDate
    description?: MultiLangStringSet
}

export default EducationQuality

