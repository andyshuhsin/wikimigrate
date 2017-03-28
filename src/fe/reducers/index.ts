import {Action} from "../actions"
import {FilterId, FilterState} from "../data"
import {Path} from "../utils/definitions";
import {Person} from "../../definitions/Person";

export interface VisaPlannerState {
    user: Person,
    ui: {
        expandedFilterId: FilterId | null
        enabledFilters: FilterState,
        pathOnDisplay: Path | null,
    }
}

const INITIAL_STATE: VisaPlannerState = {
    user: {
        birth: {
            birthday: undefined,
            region: undefined,
        },
        status: {
            // TODO: Should this part be automated?
            world: ["alien"],
            canada: ["alien"],
            australia: ["alien"],
            canada_pacific_provinces: ["alien"],
        },
        education: undefined,
        languageTests: undefined,
    },
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
