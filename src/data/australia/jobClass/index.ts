import {
    JobClassification,
    JobGroup,
    JobType,
} from '../../../definitions/auxillary/JobClassification'

const sol: JobGroup = {
    id: "sol",
    description: {
        en: "Skilled Occupations List"
    },
    parentGroup: null,
}

const csol: JobGroup = {
    id: "csol",
    description: {
        en: "Consolidated Sponsored Occupations List"
    },
    parentGroup: null,
}

const skilledOcupationLists: JobClassification = {
    regionId: "australia",
    title: {
        en: "Skilled Occupations List"
    },
    titleShort: {
        en: "SOL"
    },
    version: "2016",
    jobGroups: {
        sol
    }
}

export default skilledOcupationLists
