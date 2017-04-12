import {Action} from "../actions"
import {englishTestAssumptions, FilterId, FilterState} from "../data"
import {Path} from "../utils/definitions"
import {Person} from "../../definitions/Person"

export interface VisaPlannerState {
    user: Person,
    ui: {
        expandedFilterId: FilterId | null
        filterState: FilterState
        shouldDetailedFilterPanelExpand: boolean
        filterPanelHeight: number | null
        pathOnDisplay: Path | null
    }
}

const INITIAL_STATE: VisaPlannerState = {
    user: {
        birth: {
            date: undefined,
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
        filterPanelHeight: null,
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
            // Person data
            switch (action.payload.filterId) {
                case "english": {
                    if (action.payload.optionId === newState.ui.filterState[action.payload.filterId]) {
                        newState.user.languageTests = undefined
                    }
                    else if (action.payload.optionId === "good") {
                        newState.user.languageTests = englishTestAssumptions.good
                    } else {
                        newState.user.languageTests = englishTestAssumptions.bad
                    }
                    break
                }
                default: {
                    console.warn("Unimplemented state change for filterId", action.payload.filterId)
                }
            }

            // UI
            if (state.ui.filterState[action.payload.filterId] === action.payload.optionId) {
                newState.ui.filterState[action.payload.filterId] = null
            } else {
                newState.ui.filterState[action.payload.filterId] = action.payload.optionId
            }
            return newState
        }

        case "PATH_BOX_CLICK": {
            const newState = clone(state)
            newState.ui.pathOnDisplay = action.payload.path
            return newState
        }

        case "FILTER_BAR_CLICK": {
            const newState = clone(state)
            newState.ui.shouldDetailedFilterPanelExpand = !newState.ui.shouldDetailedFilterPanelExpand
            return newState
        }

        case "SHADE_CLICK": {
            const newState = clone(state)
            newState.ui.shouldDetailedFilterPanelExpand = false
            return newState
        }

        case "FILTER_SELECT": {
            return state
        }

        case "FILTER_PANEL_RENDER": {
            const newState = clone(state)
            newState.ui.filterPanelHeight = action.payload.height
            return newState
        }

        default: {
            return state
        }
    }
}

export default reducer
