import {Action} from "../actions"
import {
    DEFAULT_AGE,
    FilterId,
    FilterState, languageAssumptionSet,
    LanguageFilterId,
} from "../data"
import {Path, PathDescriptor} from "../utils/definitions"
import {Person} from "../../definitions/Person"
import {clone} from "../utils/clone"
import {duration} from "../../definitions/auxillary/Duration"
import {WorkExperienceQuality} from "../../definitions/Qualities/WorkExperience"
import {EducationQuality} from "../../definitions/Qualities/EducationExperience"
import {LanguageTestResult} from "../../definitions/auxillary/LanguageTest"
import {LangId} from "../../definitions/auxillary/MultiLang"
import languageTestProfiles from "../../data/common/languageTestProfiles"
import data from "../../data/index"

const ESC_KEY_CODE = 27
const F_KEY_CODE = 70

export interface VisaPlannerState {
    user: Person,
    ui: {
        lang: LangId
        expandedFilterId: FilterId | null
        filterState: FilterState
        shouldDetailedFilterPanelExpand: boolean
        filterPanelHeight: number | null
        pathOnDisplay: PathDescriptor | null
    }
}

export const INITIAL_STATE: VisaPlannerState = {
    user: {
        birth: {
            date: {
                year: new Date().getFullYear() - DEFAULT_AGE
            },
            region: undefined,
        },
        status: {
            // TODO: Should this part be automated?
            world: ["alien"],
            canada: ["alien"],
            australia: ["alien"],
            canada_atlantic_provinces: ["alien"],
            new_zealand: ["alien"],
        },
        education: undefined,
        languageTests: undefined,
        inUnion: undefined,
        spouse: undefined,
    },
    ui: {
        lang: data.app.lang,
        shouldDetailedFilterPanelExpand: false,
        filterState: {
            work_experience_duration: null,
            work_experience_region: null,
            english: null,
            french: null,
            education_level: null,
            education_region: null,
            age: null,
            app_lang: null,
        },
        filterPanelHeight: null,
        expandedFilterId: null,
        pathOnDisplay: null,
    }
}

function calcUserLanguageTests(
    language: "english" | "french",
    newLevel: LanguageFilterId | "reset",
    currentLanguageTests: LanguageTestResult[] | undefined,
): LanguageTestResult[] | undefined {
    let langId: LangId
    if (language === "english") {
        langId = "en"
    }
    else if (language === "french") {
        langId = "fr"
    }
    else {
        console.warn("Unknown prereqId as language: ", language)
        return undefined
    }

    if (currentLanguageTests) {
        let res = currentLanguageTests.filter(test => test.language !== langId)
        if (newLevel === "reset") {
            return res
        }
        else {
            const assumptions = languageAssumptionSet[langId]
            if (assumptions) {
                return res.concat(assumptions[newLevel])
            }
            else {
                console.warn(langId, "doesn't have languageAssumptions")
                return res
            }
        }
    }
    else {
        if (newLevel === "reset") {
            return undefined
        }
        else {
            const assumptions = languageAssumptionSet[langId]
            if (assumptions) {
                return assumptions[newLevel]
            }
            else {
                console.warn(langId, "doesn't have languageAssumptions")
                return undefined
            }
        }
    }

}

function reducer(state = INITIAL_STATE, action: Action): VisaPlannerState {
    const newState = clone(state)
    switch (action.type) {

        case "KEY_DOWN": {
            if (action.payload.keyCode === ESC_KEY_CODE) {
                newState.ui.pathOnDisplay = null
                newState.ui.shouldDetailedFilterPanelExpand = false
                return newState
            }
            // else if (action.payload.keyCode === F_KEY_CODE) {
            //     newState.ui.shouldDetailedFilterPanelExpand = !newState.ui.shouldDetailedFilterPanelExpand
            //     return newState
            // }
            return state
        }

        case "FILTER_OPTION_CLICK": {
            // Person data
            switch (action.payload.filterId) {
                case "english": {
                    let newLevel: LanguageFilterId | "reset" = action.payload.value
                    if (newLevel === newState.ui.filterState[action.payload.filterId]) {
                        newLevel = "reset"
                    }
                    newState.user.languageTests = calcUserLanguageTests(
                        "english",
                        newLevel,
                        state.user.languageTests
                    )
                    break
                }
                case "french": {
                    let newLevel: LanguageFilterId | "reset" = action.payload.value
                    if (newLevel === newState.ui.filterState[action.payload.filterId]) {
                        newLevel = "reset"
                    }
                    newState.user.languageTests = calcUserLanguageTests(
                        "french",
                        newLevel,
                        state.user.languageTests
                    )
                    break
                }
                case "age": {
                    const date = new Date()
                    const age = Number(action.payload.value)
                    newState.user.birth.date = {
                        year: date.getFullYear() - age
                    }
                    break
                }
                case "education_level": {
                    const education = newState.user.education
                    if (education && education[0]) {
                        education[0].stage = action.payload.value
                    }
                    else {
                        newState.user.education = [{
                            qualityId: "education",
                            stage: action.payload.value
                        } as EducationQuality]
                    }
                    break
                }
                case "education_region": {
                    const education = newState.user.education
                    if (education && education[0]) {
                        education[0].regionId = action.payload.value
                    }
                    else {
                        newState.user.education = [{
                            qualityId: "education",
                            regionId: action.payload.value
                        } as EducationQuality]
                    }
                    break
                }
                case "work_experience_duration": {
                    const works = newState.user.workExperiences
                    if (works && works[0]) {
                        works[0].duration = duration(action.payload.value, "year")
                    }
                    else {
                        newState.user.workExperiences = [{
                            qualityId: "work_experience",
                            duration: duration(action.payload.value, "year"),
                        } as WorkExperienceQuality]
                    }
                    break
                }
                case "work_experience_region": {
                    const works = newState.user.workExperiences
                    if (works && works[0]) {
                        works[0].regionId = action.payload.value
                    }
                    else {
                        newState.user.workExperiences = [{
                            qualityId: "work_experience",
                            region: action.payload.value,
                        } as WorkExperienceQuality]
                    }
                    break
                }
                case "app_lang": {
                    newState.ui.lang = action.payload.value || data.app.lang
                    break
                }
                default: {
                    console.warn("Unexpected filterId:", (action.payload as any).filterId)
                }
            }

            // UI
            if (state.ui.filterState[action.payload.filterId] === action.payload.value) {
                newState.ui.filterState[action.payload.filterId] = null
            } else {
                newState.ui.filterState[action.payload.filterId] = action.payload.value
            }
            return newState
        }

        case "PATH_BOX_CLICK": {
            newState.ui.pathOnDisplay = {
                transitionIds: action.payload.path.transitions.map(transition => transition.id)
            }
            return newState
        }

        case "PATH_VIEW_CLOSE_BUTTON_CLICK": {
            newState.ui.pathOnDisplay = null
            return newState
        }

        case "FILTER_BAR_CLICK": {
            newState.ui.shouldDetailedFilterPanelExpand = !newState.ui.shouldDetailedFilterPanelExpand
            return newState
        }

        case "SHADE_CLICK": {
            newState.ui.shouldDetailedFilterPanelExpand = false
            return newState
        }

        case "FILTER_SELECT": {
            return state
        }

        case "FILTER_PANEL_RENDER": {
            newState.ui.filterPanelHeight = action.payload.height
            return newState
        }
        default: {
            return state
        }
    }
}

export default reducer
