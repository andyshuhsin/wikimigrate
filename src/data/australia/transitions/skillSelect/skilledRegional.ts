import {
    Transition,
    WorkExperiencePrereq,
    AgePrereq,
    duration,
    oneOf,
    allOf,
    LanguageBenchamrkPrereq,
    RightPrereq,
} from '../../../common'

import {
    alien,
    visa189holder,
} from '../../status'

import {
    competentEnglish,
    below50,
} from './skillSelectCommon'

const skilledRegional: Transition = {
    id: "skilled_regional",
    acquireBy: "application",
    name: {
        en: "Skilled Regional (Provisional) visa (subclass 489)",
        "zh-hans": "偏远地区担保技术移民(189)"
    },
    from: alien,
    to: visa189holder,
    prerequisiteList: allOf([
        competentEnglish,
        below50,
        {
            property: "work_experience",
            jobTypes: allOf([
                {
                    description: {
                        en: "Skilled Occupation List"
                    }
                }
            ])
        } as WorkExperiencePrereq,
    ]),
    procedureList: [
        {
            name: {
                en: "Be nominated by an Australian State or Territory government agency or sponsored by an eligible relative living in a designated area"
            }
        },
        {
            name: {
                en: "Submit Expression of Interest"
            }
        },
        {
            name: {
                en: "Wait"
            }
        }
    ],
    referenceList: [
        {
            url: "https://www.border.gov.au/Trav/Visa-1/489-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default skilledRegional