import { FilterId, LanguageFilterId, OptionId } from '../data'
import { Pathway } from '../utils/definitions'
import { EducationStage } from '../../definitions/Qualities/EducationExperience'
import { RegionId } from '../../definitions/auxiliary/Region'
import { LangId } from '../../definitions/auxiliary/MultiLang'

interface BaseOptionClickAction {
    type: 'FILTER_OPTION_CLICK'
    payload: {
        filterId: FilterId
        value: OptionId | number
    }
}

interface OptionClickAction_Age extends BaseOptionClickAction {
    payload: {
        filterId: 'age',
        value: number,
    }
}

interface OptionClickAction_EducationLevel extends BaseOptionClickAction {
    payload: {
        filterId: 'education_level',
        value: EducationStage,
    }
}

interface OptionClickAction_EducationRegion extends BaseOptionClickAction {
    payload: {
        filterId: 'education_region',
        value: RegionId,
    }
}

interface OptionClickAction_English extends BaseOptionClickAction {
    payload: {
        filterId: 'english',
        value: LanguageFilterId,
    }
}

interface OptionClickAction_French extends BaseOptionClickAction {
    payload: {
        filterId: 'french',
        value: LanguageFilterId,
    }
}

interface OptionClickAction_WorkExperienceRegion extends BaseOptionClickAction {
    payload: {
        filterId: 'work_experience_region',
        value: RegionId,
    }
}

interface OptionClickAction_WorkExperienceDuration extends BaseOptionClickAction {
    payload: {
        filterId: 'work_experience_duration',
        value: number,
    }
}

interface OptionClickAction_AppLang extends BaseOptionClickAction {
    payload: {
        filterId: 'app_lang',
        value: LangId,
    }
}

export type OptionClickAction_MultipleChoice =
    OptionClickAction_EducationLevel
    | OptionClickAction_EducationRegion
    | OptionClickAction_English
    | OptionClickAction_French
    | OptionClickAction_WorkExperienceRegion
    | OptionClickAction_AppLang

export type OptionClickAction_RealVallue =
    OptionClickAction_Age
    | OptionClickAction_WorkExperienceDuration

export type OptionClickAction =
    OptionClickAction_MultipleChoice
    | OptionClickAction_RealVallue

export interface FilterSelectAction {
    type: 'FILTER_SELECT'
    payload: {
        filterId: FilterId,
        value: string,
    }
}

export interface FilterBarClick {
    type: 'FILTER_BAR_CLICK'
}

export interface ShadeClick {
    type: 'SHADE_CLICK'
}

export interface PathwayBoxClick {
    type: 'PATH_BOX_CLICK',
    payload: {
        pathway: Pathway
    }
}

export interface PathViewCloseButtonClick {
    type: 'PATH_VIEW_CLOSE_BUTTON_CLICK'
}

export interface FilterPanelRender {
    type: 'FILTER_PANEL_RENDER',
    payload: {
        height: number
    }
}

export interface KeyDown {
    type: 'KEY_DOWN',
    payload: {
        keyCode: number
    }
}

interface UrlPathChange {
    type: 'URLPATH_CHANGE',
    payload: {
        path: string
    }
}

interface SetLang {
    type: 'SET_LANG',
    payload: {
        langId: LangId
    }
}


export type Action =
    OptionClickAction
    | FilterSelectAction
    | FilterBarClick
    | FilterPanelRender
    | ShadeClick
    | PathwayBoxClick
    | PathViewCloseButtonClick
    | KeyDown
    | UrlPathChange
    | SetLang

export function filterOptionClickAction(filterId: FilterId, value: OptionId | number): OptionClickAction {
    const action = {
        type: 'FILTER_OPTION_CLICK',
        payload: {
            filterId,
            value,
        },
    }

    if (typeof value === 'number') {
        return action as OptionClickAction_RealVallue
    }
    else if (typeof value === 'string') {
        return action as OptionClickAction_MultipleChoice
    }
    else {
        console.warn('Unexpected option click value type:', value)
        return action as OptionClickAction_MultipleChoice
    }
}

export function filterSelect(filterId: FilterId, value: string): FilterSelectAction {
    return {
        type: 'FILTER_SELECT',
        payload: {
            filterId,
            value,
        },
    }
}

export function filterPanelRenderAction(height: number): FilterPanelRender {
    return {
        type: 'FILTER_PANEL_RENDER',
        payload: {
            height,
        },
    }
}

export function filterBarClickAction(): FilterBarClick {
    return {
        type: 'FILTER_BAR_CLICK',
    }
}

export function shadeClickAction(): ShadeClick {
    return {
        type: 'SHADE_CLICK',
    }
}

export function pathBoxClickAction(pathway: Pathway): PathwayBoxClick {
    return {
        type: 'PATH_BOX_CLICK',
        payload: {
            pathway,
        },
    }
}

export function pathViewCloseButtonClickAction(): PathViewCloseButtonClick {
    return {
        type: 'PATH_VIEW_CLOSE_BUTTON_CLICK',
    }
}

export function keyDownAction(keyCode: number): KeyDown {
    return {
        type: 'KEY_DOWN',
        payload: {
            keyCode,
        },
    }
}

export function urlpathChangeAction(path: string): UrlPathChange {
    return {
        type: 'URLPATH_CHANGE',
        payload: {
            path,
        },
    }
}

export function setLangAction(langId: LangId): SetLang {
    return {
        type: 'SET_LANG',
        payload: {
            langId,
        },
    }
}
