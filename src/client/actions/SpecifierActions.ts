import { SpecifierId } from '../data'
import { Duration } from '../../definitions/auxiliary/Duration'
import { RegionId } from '../../definitions/auxiliary/Region'
import { LanguageTestId, LanguageTestItem, LanguageTestResult } from '../../definitions/auxiliary/LanguageTest'
import { EducationStage } from '../../definitions/Qualities/EducationExperience'

interface BaseOptionClickAction<Payload> {
    type: 'SPECIFIER_CLICK'
    payload: Payload
}

interface BaseSpecifierActionPayload {
    specifier: SpecifierId,
    value: any
}

interface OptionClickPayload_Integer extends BaseSpecifierActionPayload {
    specifier: SpecifierId,
    value: number
}

interface OptionClickPayload_Age extends OptionClickPayload_Integer {
    specifier: 'age'
    value: number
}

export type SpecifierListOperator = 'NEW' | 'REMOVE' | 'MODIFY'

interface OptionClickPayload_List extends BaseSpecifierActionPayload {
    specifier: SpecifierId,
    operator: SpecifierListOperator
    index: number
    value: any
}

type DurationAndLocation = {
    duration?: Duration
    location?: RegionId
}

interface OptionClickPayload_Education extends OptionClickPayload_List {
    specifier: 'education'
    value: DurationAndLocation
}

interface OptionClickPayload_WorkExperience extends OptionClickPayload_List {
    specifier: 'work_experience',
    value: DurationAndLocation
}

interface OptionClickPayload_Language extends OptionClickPayload_List {
    specifier: 'language',
    value: LanguageTestResult,
}

export interface LanguageTestAddAction {
    type: 'LANGUAGE_TEST_ADD'
}

export interface LanguageTestRemoveAction {
    type: 'LANGUAGE_TEST_REMOVE',
    payload: {
        index: number
    }
}

export interface LanguageTestChangeAction {
    type: 'LANGUAGE_TEST_CHANGE'
    payload: {
        index: number
        test: LanguageTestId
    }
}

export interface LanguageTestScoreChangeAction {
    type: 'Language_Test_Score_Change'
    payload: {
        index: number
        item: LanguageTestItem
        score: number
    }
}


export interface EducationAddAction {
    type: 'EDUCATION_ADD'
}

export interface EducationRemoveAction {
    type: 'EDUCATION_REMOVE'
    payload: {
        index: number
    }
}

export interface EducationStageChangeAction {
    type: 'EDUCATION_STAGE_CHANGE'
    payload: {
        index: number
        stage: EducationStage
    }
}

export interface EducationRegionChangeAction {
    type: 'EDUCATION_REGION_CHANGE'
    payload: {
        index: number
        region: RegionId
    }
}

export type SpecifierAction =
    | BaseOptionClickAction<OptionClickPayload_Education>
    | BaseOptionClickAction<OptionClickPayload_WorkExperience>
    | BaseOptionClickAction<OptionClickPayload_Language>
    | BaseOptionClickAction<OptionClickPayload_Age>

    | LanguageTestAddAction
    | LanguageTestRemoveAction
    | LanguageTestChangeAction
    | LanguageTestScoreChangeAction

    | EducationAddAction
    | EducationRemoveAction
    | EducationStageChangeAction
    | EducationRegionChangeAction

export function languageTestChangeAction(
    index: number,
    test: LanguageTestId
): LanguageTestChangeAction {
    return {
        type: 'LANGUAGE_TEST_CHANGE',
        payload: {
            index,
            test,
        }
    }
}

export function languageTestScoreChangeAction(
    index: number,
    item: LanguageTestItem,
    score: number,
): LanguageTestScoreChangeAction {
    return {
        type: 'Language_Test_Score_Change',
        payload: {
            index,
            item,
            score,
        }
    }
}

export function languageTestAddAction(): LanguageTestAddAction {
    return {
        type: 'LANGUAGE_TEST_ADD',
    }
}

export function languageTestRemoveAction(index: number): LanguageTestRemoveAction {
    return {
        type: 'LANGUAGE_TEST_REMOVE',
        payload: {
            index
        }
    }
}

export function educationAddAction(): EducationAddAction {
    return {
        type: 'EDUCATION_ADD'
    }
}

export function educationRemoveAction(index: number): EducationRemoveAction {
    return {
        type: 'EDUCATION_REMOVE',
        payload: {
            index
        }
    }
}


export function educationStageChangeAction(
    index: number, stage: EducationStage
): EducationStageChangeAction {
    return {
        type: 'EDUCATION_STAGE_CHANGE',
        payload: {
            stage,
            index
        }
    }
}

export function educationRegionChangeAction(
    index: number, region: RegionId
): EducationRegionChangeAction {
    return {
        type: 'EDUCATION_REGION_CHANGE',
        payload: {
            index,
            region,
        }
    }
}

export function specifierClickAction(
    specifier: SpecifierId,
    value: any,
    index?: number,
    operator?: SpecifierListOperator
): SpecifierAction {
    return {
        type: 'SPECIFIER_CLICK',
        payload: {
            specifier,
            value,
            index,
            operator,
        },
    } as SpecifierAction
}

