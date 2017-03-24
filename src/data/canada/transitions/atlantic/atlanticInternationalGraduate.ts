import {
    Transition,
    allOf,
    oneOf,
    duration,
    WorkExperiencePrereq,
    EducationPrereq,
    ResidencePrereq,
    RightPrereq,
} from '../../../../definitions'

import {
    alien,
    pr,
} from '../../status'

const atlanticInternationalGraduate: Transition = {
    id: "atlantic_international_graduate",
    regionId: "canada",
    acquireBy: "application",
    from: alien,
    to: pr,
    name: {
        en: "Atlantic International Graduate Program"
    },
    prerequisiteList: allOf([
        {
            property: "education",
            stage: "post-secondary",
        } as EducationPrereq,
        {
            property: "education",
            stage: undefined,
            regionId: "canada",
            duration: duration(2, "year"),
            graduateNoEarlierThan: duration(12, "month")
        } as EducationPrereq,
        {
            property: "residence",
            regionId: "canada-pacific-provinces",
            duration: duration(16, "month"),
            validPeriod: duration(2, "year"),
        } as ResidencePrereq,

        oneOf([
            {
                property: "right",
                regionId: "canada",
                rightId: "work"
            } as RightPrereq,
            {
                property: "right",
                regionId: "canada",
                rightId: "study"
            } as RightPrereq,
            {
                property: "right",
                regionId: "canada",
                rightId: "train"
            } as RightPrereq,
        ])
    ]),
    procedureList: [
        {
            "name": {
                "en": "Application"
            }
        }
    ]
}

export default atlanticInternationalGraduate
