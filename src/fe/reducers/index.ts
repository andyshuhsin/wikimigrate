import {Action} from "../actions"
import {FilterId, FilterState} from "../data"
import {Path} from "../utils/definitions";
import {Person} from "../../definitions/Person";

export interface VisaPlannerState {
    user: Person,
    ui: {
        expandedFilterId: FilterId | null
        filterState: FilterState
        shouldDetailedFilterPanelExpand: boolean
        pathOnDisplay: Path | null
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
        shouldDetailedFilterPanelExpand: false,
        filterState: {
            offer: null,
            english: null,
            education: null,
        },
        expandedFilterId: null,
        pathOnDisplay: null,
    }
}

function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}


function reducer(state = INITIAL_STATE, action: Action): VisaPlannerState {
    switch (action.type) {
        case "FILTER_OPTION_CLICK": {
            const newState = clone(state)
            if (state.ui.filterState[action.payload.filterId] === action.payload.optionId) {
                newState.ui.filterState[action.payload.filterId] = null
            } else {
                newState.ui.filterState[action.payload.filterId] = action.payload.optionId
            }
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
