import {
    Transition,
    oneOf,
} from '../../../common'

import {
    alien,
    expressEntryCandidate
} from '../../status'

const expressEntry: Transition = {
    id: "express_entry",
    acquireBy: "invitation",
    name: {
        en: "Express Entry",
        'zh-hans': "快速移民通道——Express Entry(EE)"
    },
    from: alien,
    to: expressEntryCandidate,
    prerequisiteList: oneOf([

    ]),
    procedureList: [
        {
            name: {
                en: "Application",
                "zh-hans": "填表申请",
            }
        }
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/express-entry/",
            title: {
                en: "Official Website"
            }
        }
    ]
}

// TODO: procedureList among the three routes seems to be similar

export default expressEntry