import {FilterId, OptionId} from "../data"

export interface MenuClickAction {
    type: "FILTER_OPTION_CLICK"
    payload: {
        filterId: FilterId
        optionId: OptionId
    }
}

export interface FilterSelectAction {
    type: "FILTER_SELECT"
    payload: {
        filterId: FilterId,
        value: string,
    }
}

export function filterOptionClickAction(filterId: FilterId, optionId: OptionId): MenuClickAction {
    return {
        type: "FILTER_OPTION_CLICK",
        payload: {
            filterId,
            optionId,
        }
    }
}

export function filterSelect(filterId: FilterId, value: string): FilterSelectAction {
    return {
        type: "FILTER_SELECT",
        payload: {
            filterId,
            value
        }
    }
}

export type Action = MenuClickAction | FilterSelectAction
