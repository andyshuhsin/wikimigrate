import { ScoreCondition } from '../../../definitions/ScoreSystem'
import { allOf } from '../../../definitions/auxiliary/Combination'
import { WorkExperiencePrereq } from '../../../definitions/Prerequisites/WorkExperiencePrereq'
import { duration } from '../../../definitions/auxiliary/Duration'
import { UnionPrereq } from '../../../definitions/Prerequisites/UnionPrereq'

type MarriedScore = number
type SingleScore = number

type WorkTable = {
    [workExperienceInYear: number]: [MarriedScore, SingleScore]
}

const workTable: WorkTable = {
    0: [0, 0],
    1: [35, 40],
    2: [46, 53],
    3: [56, 64],
    4: [63, 72],
    5: [70, 80],
}

const canadaWorkConditions: ScoreCondition[] = []

for (const workYear in workTable) {
    for (const isInUnion of [true, false]) {
        const index = isInUnion ? 0 : 1
        const crsScore = workTable[workYear][index]
        canadaWorkConditions.push({
            score: crsScore,
            batch: 'canada-work',
            prerequisites: allOf([
                {
                    prereqId: 'union',
                    inUnion: isInUnion,
                } as UnionPrereq,
                {
                    prereqId: 'work_experience',
                    duration: [">=", duration(+workYear, 'year')],
                    region: 'canada'
                } as WorkExperiencePrereq
            ])
        })
    }
}

export {
    canadaWorkConditions
}
