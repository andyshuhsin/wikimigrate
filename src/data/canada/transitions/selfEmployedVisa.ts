import {
    Transition,
    oneOf,
    allOf,
    WorkExperiencePrereq,
} from '../../../definitions'

import {
    alien,
    pr
} from '../status'

const selfEmployedVisa: Transition = {
    id: "self_employed",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Self Employed"
    },
    from: alien,
    to: pr,
    prerequisiteList: oneOf([
        allOf([
            {
                property: "work_experience",
                jobNature: {
                    en: "Have relevant experience in cultural activities or athletics",
                }
            } as WorkExperiencePrereq,
            {
                property: "work_experience",
                jobNature: {
                    en: "Intend and be able to make a significant contribution to the cultural or athletic life of Canada"
                }
            } as WorkExperiencePrereq,
        ]),
        allOf([
            {
                property: "work_experience",
                jobNature: {
                    en: "Have experience in farm management"
                }
            } as WorkExperiencePrereq,
            {
                property: "work_experience",
                jobNature: {
                    en: "Intend and be able to buy and manage a farm in Canada"
                }
            } as WorkExperiencePrereq,
        ])
    ]),
    procedureList: [],
}

export default selfEmployedVisa
