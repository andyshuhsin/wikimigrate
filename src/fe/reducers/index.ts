import {Action} from "../actions"
import {FilterId, FilterState} from "../data"
import {Path} from "../utils/definitions";

export interface VisaPlannerState {
    ui: {
        expandedFilterId: FilterId | null
        enabledFilters: FilterState,
        pathOnDisplay: Path | null,
    }
}

const INITIAL_STATE: VisaPlannerState = {
    ui: {
        expandedFilterId: null,
        enabledFilters: {
            offer: '',
            education: '',
            english: '',
        },
        pathOnDisplay: null,
    }
}

function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}


function reducer(state = INITIAL_STATE, action: Action): VisaPlannerState {
    switch (action.type) {
        case "MENU_CLICK": {
            const newState = clone(state)
            newState.ui.expandedFilterId = action.payload.id
            return newState
        }

        case "FILTER_SELECT": {
            return state
        }

        default: {
            return state
        }
    }
}

export default reducer
