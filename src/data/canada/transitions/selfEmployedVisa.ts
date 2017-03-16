import {
    Transition,
    oneOf,
    allOf,
} from '../../common'

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
                description: {
                    en: "Have relevant experience in cultural activities or athletics",
                }
            },
            {
                description: {
                    en: "Intend and be able to make a significant contribution to the cultural or athletic life of Canada"
                }
            }
        ]),
        allOf([
            {
                description: {
                    en: "Have experience in farm management"
                }
            },
            {
                description: {
                    en: "Intend and be able to buy and manage a farm in Canada"
                }
            }
        ])
    ]),
    procedureList: [],
}

export default selfEmployedVisa