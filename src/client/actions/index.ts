import { SpecifierId } from '../data'
import { Pathway } from '../utils/definitions'
import { LangId } from '../../definitions/auxiliary/MultiLang'
import { SpecifierAction } from './SpecifierActions'

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

interface TitleFilterTextClick {
    type: 'TITLE_FILTER_TEXT_CLICK',
}

export type Action =
    SpecifierAction
    | FilterBarClick
    | ShadeClick
    | PathwayBoxClick
    | PathViewCloseButtonClick
    | KeyDown
    | UrlPathChange
    | SetLang
    | TitleFilterTextClick

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

export function titleFilterTextClickAction(): TitleFilterTextClick {
    return {
        type: 'TITLE_FILTER_TEXT_CLICK',
    }
}
