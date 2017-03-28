import {FilterId} from "../data"

export interface MenuClickAction {
    type: "MENU_CLICK"
    payload: {
        id: FilterId
    }
}

export interface FilterSelectAction {
    type: "FILTER_SELECT"
    payload: {
        filterId: FilterId,
        value: string,
    }
}

export function menuClick(menuItemId: FilterId): MenuClickAction {
    return {
        type: "MENU_CLICK",
        payload: {
            id: menuItemId,
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
