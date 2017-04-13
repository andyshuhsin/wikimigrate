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
        en: "Skilled Occupations List"
    },
    titleShort: {
        en: "SOL"
    },
    version: "2016",
    jobGroups: {
        sol,
        csol,
    }
}

/**/export default australiaJobClassification
