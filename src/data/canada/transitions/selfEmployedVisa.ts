import Transition from '../../../definitions/Transition'
import { allOf, identity, oneOf } from '../../../definitions/auxiliary/Combination'
import { WorkExperiencePrereq } from '../../../definitions/Prerequisites/WorkExperiencePrereq'

import { alien, pr } from '../status'

const selfEmployedVisa: Transition = {
    id: 'self_employed',
    regionId: 'canada',
    acquireBy: 'application',
    name: {
        en: 'Self Employed',
    },
    from: alien,
    to: pr,
    prerequisiteList: oneOf([
        allOf([
            {
                prereqId: 'work_experience',
                jobGroups: identity([
                    {
                        en: 'Have relevant experience in cultural activities or athletics',
                    },
                ]),
            } as WorkExperiencePrereq,
            {
                prereqId: 'work_experience',
                jobGroups: identity([
                    {
                        en: 'Intend and be able to make a significant contribution to the cultural or athletic life of Canada',
                    },
                ]),
            } as WorkExperiencePrereq,
        ]),
        allOf([
            {
                prereqId: 'work_experience',
                jobGroups: identity([
                    {
                        en: 'Have experience in farm management',
                    },
                ]),
            } as WorkExperiencePrereq,
            {
                prereqId: 'work_experience',
                jobGroups: identity([
                    {
                        en: 'Intend and be able to buy and manage a farm in Canada',
                    },
                ]),
            } as WorkExperiencePrereq,
        ]),
    ]),
    paperwork: {
        procedureList: [],
    }
}

export default selfEmployedVisa
