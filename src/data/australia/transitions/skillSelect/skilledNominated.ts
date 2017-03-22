import {
    Transition,
    WorkExperiencePrereq,
    AgePrereq,
    duration,
    oneOf,
    allOf,
    RightPrereq,
} from '../../../../definitions'

import {
    alien,
    visa190holder,
} from '../../status'

import {
    competentEnglish,
    below50,
} from './skillSelectCommon'

const skilledNominated: Transition = {
    id: "skilled_nominated",
    regionId: "australia",
    acquireBy: "application",
    name: {
        en: "Skilled Nominated visa (subclass 190)",
        "zh-hans": "州担保技术移民(190)"
    },
    from: alien,
    to: visa190holder,
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
                en: "Be nominated by an Australian state or territory government agency"
            }
        },
        {
            name: {
                en: "Obtain a suitable skills assessment for that occupation"
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
            url: "https://www.border.gov.au/Trav/Visa-1/190-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default skilledNominated