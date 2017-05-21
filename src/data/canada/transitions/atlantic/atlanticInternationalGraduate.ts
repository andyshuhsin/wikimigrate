import { alien, pr } from '../../status'
import Transition from '../../../../definitions/Transition'
import { allOf, oneOf } from '../../../../definitions/auxiliary/Combination'
import { EducationPrereq } from '../../../../definitions/Prerequisites/EducationPrereq'
import { duration } from '../../../../definitions/auxiliary/Duration'
import { ResidencePrereq } from '../../../../definitions/Prerequisites/ResidencePrereq'
import { RightPrereq } from '../../../../definitions/Prerequisites/RightPrereq'

const atlanticInternationalGraduate: Transition = {
    id: 'atlantic_international_graduate',
    regionId: 'canada',
    acquireBy: 'application',
    from: alien,
    to: pr,
    name: {
        en: 'Atlantic International Graduate Program',
    },
    prerequisiteList: allOf([
        {
            prereqId: 'education',
            stage: ['>=', 'secondary'],
        } as EducationPrereq,
        {
            prereqId: 'education',
            stage: null,
            region: 'canada',
            duration: ['>=', duration(2, 'year')],
            graduateWithin: duration(12, 'month'),
        } as EducationPrereq,
        {
            prereqId: 'residence',
            regionId: 'canada_atlantic_provinces',
            duration: duration(16, 'month'),
            validPeriod: duration(2, 'year'),
        } as ResidencePrereq,

        oneOf([
            {
                prereqId: 'right',
                regionId: 'canada',
                rightId: 'work',
            } as RightPrereq,
            {
                prereqId: 'right',
                regionId: 'canada',
                rightId: 'study',
            } as RightPrereq,
            {
                prereqId: 'right',
                regionId: 'canada',
                rightId: 'train',
            } as RightPrereq,
        ]),
    ]),
    procedureList: [
        {
            'name': {
                'en': 'Application',
            },
        },
    ],
}

export default atlanticInternationalGraduate
