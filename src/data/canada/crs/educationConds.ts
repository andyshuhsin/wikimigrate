import { Interval } from '../../../definitions/auxiliary/Operator'
import { EducationStage } from '../../../definitions/Qualities/EducationExperience'
import { Duration, duration } from '../../../definitions/auxiliary/Duration'
import { onlyInParentGroup, ScoreCondition } from '../../../definitions/ScoreSystem'
import { allOf, Combination, identity } from '../../../definitions/auxiliary/Combination'
import { EducationPrereq } from '../../../definitions/Prerequisites/EducationPrereq'
import { UnionPrereq } from '../../../definitions/Prerequisites/UnionPrereq'
import { SpousePrereq } from '../../../definitions/Prerequisites/SpousePrereq'

type MarriedScore = number
type SingleScore = number
type SpouseBonusScore = number

type EducationTableEntry<T> = {
    stage: Interval<EducationStage>
    minDuration?: Duration
    // two degrees at the same time
    stageSecond?: Interval<EducationStage>
    minDurationSecond?: Duration

    scores: T
}

type EducationTable = EducationTableEntry<[MarriedScore, SingleScore]>[]
type EducationTableSpouseBonusTable = EducationTableEntry<SpouseBonusScore>[]

const educationTable: EducationTable = [
    {
        stage: ['=', 'secondary'],
        scores: [28, 30],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(1, 'year'),
        scores: [84, 90],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(2, 'year'),
        scores: [91, 98],
    },
    {
        stage: ['=', 'bachelor'],
        scores: [112, 120],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        scores: [112, 120],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        stageSecond: ['>', 'secondary'],
        minDurationSecond: undefined,
        scores: [119, 128],
    },
    {
        stage: ['=', 'master'],
        scores: [126, 135],
    },
    {
        stage: ['=', 'professional'],
        scores: [126, 135],
    },
    {
        stage: ['=', 'phd'],
        scores: [140, 150],
    },
]

const educationTableSpouseBonusTable: EducationTableSpouseBonusTable = [
    {
        stage: ['=', 'secondary'],
        scores: 2,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(1, 'year'),
        scores: 6,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(2, 'year'),
        scores: 6,
    },
    {
        stage: ['=', 'bachelor'],
        scores: 7,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        scores: 8,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        stageSecond: ['>', 'secondary'],
        minDurationSecond: undefined,
        scores: 9,
    },
    {
        stage: ['=', 'master'],
        scores: 10,
    },
    {
        stage: ['=', 'professional'],
        scores: 10,
    },
    {
        stage: ['=', 'phd'],
        scores: 10,
    },

]


function getConditionsFromEducationTable(
    table: EducationTable,
    tableSpouse: EducationTableSpouseBonusTable,
): ScoreCondition[] {

    function makePrereq(educationStage: Interval<EducationStage>, minDuration?: Duration): EducationPrereq {
        return {
            prereqId: 'education',
            stage: educationStage,
            duration: minDuration && ['>=', minDuration],
            region: 'world',
        }
    }

    function singleOrDualDegreePrerequisites(
        educationStage: Interval<EducationStage>,
        minDuration?: Duration,
        educationStageSecond?: Interval<EducationStage>,
        minDurationSecond?: Duration,
    ): Combination<EducationPrereq> | EducationPrereq {
        return educationStageSecond
            ? allOf([
                makePrereq(educationStage, minDuration),
                makePrereq(educationStageSecond, minDurationSecond),
            ], {surjective: true})
            : makePrereq(educationStage, minDuration)
    }

    function makeCondition(
        score: number,
        isMarried: boolean,
        educationStage: Interval<EducationStage>,
        minDuration?: Duration,
        educationStageSecond?: Interval<EducationStage>,
        minDurationSecond?: Duration,
    ): ScoreCondition {
        return {
            score: score,
            batch: onlyInParentGroup,
            prerequisites: allOf([
                singleOrDualDegreePrerequisites(
                    educationStage, minDuration, educationStageSecond, minDurationSecond,
                ),
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
            ]),
        }
    }

    function makeSpouseBonusCondition(
        crsScore: number,
        applicantEducation: Interval<EducationStage>,
        spouseEducation: Interval<EducationStage>,
        minDurationApplicantEducation?: Duration,
        minDurationSpouseEducation?: Duration,
        applicantEducationSecond?: Interval<EducationStage>,
        spouseEducationSecond?: Interval<EducationStage>,
        minDurationApplicantEducationSecond?: Duration,
        minDurationSpouseEducationSecond?: Duration,
    ): ScoreCondition {
        return {
            score: crsScore,
            batch: 'spouse-bonus',
            prerequisites: allOf([
                singleOrDualDegreePrerequisites(
                    applicantEducation,
                    minDurationApplicantEducation,
                    applicantEducationSecond,
                    minDurationApplicantEducationSecond,
                ),
                {
                    prereqId: 'spouse',
                    spousePrerequisites: identity([
                        singleOrDualDegreePrerequisites(
                            spouseEducation,
                            minDurationSpouseEducation,
                            spouseEducationSecond,
                            minDurationSpouseEducationSecond,
                        ),
                    ]),
                } as SpousePrereq,
            ]),
        }
    }

    const result: ScoreCondition[] = []
    for (const entry of table) {
        result.push(makeCondition(
            entry.scores[0], true,
            entry.stage, entry.minDuration,
            entry.stageSecond, entry.minDurationSecond),
        )
        result.push(makeCondition(
            entry.scores[1], false,
            entry.stage, entry.minDuration,
            entry.stageSecond, entry.minDurationSecond),
        )
    }

    for (const applicantEntry of table) {
        for (const spouseEntry of tableSpouse) {
            result.push(makeSpouseBonusCondition(
                applicantEntry.scores[0] + spouseEntry.scores,
                applicantEntry.stage,
                spouseEntry.stage,
                applicantEntry.minDuration,
                spouseEntry.minDuration,
                applicantEntry.stageSecond,
                spouseEntry.stageSecond,
                applicantEntry.minDurationSecond,
                spouseEntry.minDurationSecond,
            ))
        }
    }

    return result
}

export const educationConditions = getConditionsFromEducationTable(educationTable, educationTableSpouseBonusTable)
