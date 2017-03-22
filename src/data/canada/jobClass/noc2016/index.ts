import {
    JobClassification,
    JobGroup,
    JobType,
} from '../../../../definitions/auxillary/JobClassification'

// See: http://noc.esdc.gc.ca/English/noc/Introduction.aspx?ver=16#struc

const noc0: JobGroup = {
    id: "0",
    description: {
        en: "Management occupations"
    },
    parentGroup: null
}

const nocA: JobGroup = {
    id: "A",
    parentGroup: null
}

const nocB: JobGroup = {
    id: "B",
    parentGroup: null,
}

const nocC: JobGroup = {
    id: "C",
    parentGroup: null,
}

const nocD: JobGroup = {
    id: "D",
    parentGroup: null
}

const noc72: JobGroup = {
    id: "72",
    description: {
        en: "Major Group 72, industrial, electrical and construction trades"
    },
    parentGroup: nocB
}

const noc73: JobGroup = {
    id: "73",
    description: {
        en: "Major Group 73, maintenance and equipment operation trades"
    },
    parentGroup: nocB
}

const noc82: JobGroup = {
    id: "82",
    description: {
        en: "Major Group 82, supervisors and technical jobs in natural resources, agriculture and related production"
    },
    parentGroup: nocB
}

const noc92: JobGroup = {
    id: "92",
    description: {
        en: "Major Group 92, processing, manufacturing and utilities supervisors and central control operators"
    },
    parentGroup: nocB
}

const noc632: JobGroup = {
    id: "632",
    description: {
        en: "Major Group 92, processing, manufacturing and utilities supervisors and central control operators"
    },
    parentGroup: nocB
}

const noc633: JobGroup = {
    id: "633",
    description: {
        en: "Minor Group 633, butchers and bakers"
    },
    parentGroup: nocB
}

const noc2016: JobClassification = {
    regionId: "canada",
    title: {
        en: "National Occupational Classification"
    },
    titleShort: {
        en: "NOC"
    },
    version: "2016",
    jobGroups: {
        noc0,
        nocA,
        nocB,
        nocC,
        nocD,
        noc72,
        noc73,
        noc92,
        noc632,
        noc633,
    },
    jobTypes: [],
}

export default noc2016
