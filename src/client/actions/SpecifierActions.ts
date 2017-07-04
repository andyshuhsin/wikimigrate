import { SpecifierId } from '../data'
import { Duration } from '../../definitions/auxiliary/Duration'
import { RegionId } from '../../definitions/auxiliary/Region'
import { LanguageTestId, LanguageTestResult } from '../../definitions/auxiliary/LanguageTest'

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

export interface LanguageTestChangeAction {
    type: 'LANGUAGE_TEST_CHANGE'
    payload: {
        index: number
        test: LanguageTestId
    }
}

export type SpecifierAction =
    | BaseOptionClickAction<OptionClickPayload_Education>
    | BaseOptionClickAction<OptionClickPayload_WorkExperience>
    | BaseOptionClickAction<OptionClickPayload_Language>
    | BaseOptionClickAction<OptionClickPayload_Age>
    | LanguageTestChangeAction

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

