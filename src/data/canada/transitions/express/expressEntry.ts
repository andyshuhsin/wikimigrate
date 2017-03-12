import {
    Transition,
    ns,
    oneOf,
} from '../../../common'

const expressEntry: Transition = {
    id: "express_entry",
    acquireBy: "invitation",
    name: {
        en: "Express Entry",
        'zh-hans': "快速移民通道——Express Entry(EE)"
    },
    from: ns("canada", "express_entry_candidate"),
    to: ns("canada", "permanent"),
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

export default expressEntry