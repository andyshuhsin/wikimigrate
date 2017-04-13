import {
    JobClassification,
    JobGroup,
} from '../../../definitions/auxillary/JobClassification'

const sol: JobGroup = {
    jobGroupId: "sol",
    parentClassificationSystemId: "aus-job-class",
    specification: "",
    description: {
        en: "Skilled Occupations List"
    },
    parentGroup: null,
}

const csol: JobGroup = {
    jobGroupId: "csol",
    parentClassificationSystemId: "aus-job-class",
    specification: "",
    description: {
        en: "Consolidated Sponsored Occupations List"
    },
    parentGroup: null,
}

const australiaJobClassification: JobClassification = {
    classificationSystemId: "aus-job-class",
    regionId: "australia",
    title: {
        en: "Skilled occupations"
    },
    titleShort: {
        en: "SOL"
    },
    version: "2016",
    jobGroups: {
        sol,
        csol,
    },
    reference: {
        url: "https://www.border.gov.au/Trav/Work/Work/Skills-assessment-and-assessing-authorities/skilled-occupations-lists"
    }
}

/**/export default australiaJobClassification
