import {
    JobClassification,
    JobGroup,
} from '../../../../definitions/auxillary/JobClassification'

// See: http://noc.esdc.gc.ca/English/noc/Introduction.aspx?ver=16#struc

const noc0: JobGroup = {
    jobGroupId: "noc0",
    parentClassificationSystemId: "noc",
    specification: "0",
    description: {
        en: "Management occupations"
    },
    parentGroup: null,
    reference: {
        url: "http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314244&CPV=0&CST=01012016&CLV=1&MLV=4"
    }
}

const nocA: JobGroup = {
    jobGroupId: "nocA",
    parentClassificationSystemId: "noc",
    specification: "A",
    description: {
        en: ""
    },
    parentGroup: null
}

const nocB: JobGroup = {
    jobGroupId: "nocB",
    parentClassificationSystemId: "noc",
    specification: "B",
    description: {

    },
    parentGroup: null,
}

const nocC: JobGroup = {
    jobGroupId: "nocC",
    parentClassificationSystemId: "noc",
    specification: "C",
    description: {},
    parentGroup: null,
}

const nocD: JobGroup = {
    jobGroupId: "nocD",
    parentClassificationSystemId: "noc",
    specification: "D",
    description: {},
    parentGroup: null
}

const noc72: JobGroup = {
    jobGroupId: "noc72",
    parentClassificationSystemId: "noc",
    specification: "72",
    description: {
        en: "Major Group 72, industrial, electrical and construction trades"
    },
    parentGroup: nocB
}

const noc73: JobGroup = {
    jobGroupId: "noc73",
    parentClassificationSystemId: "noc",
    specification: "73",
    description: {
        en: "Major Group 73, maintenance and equipment operation trades"
    },
    parentGroup: nocB
}

const noc82: JobGroup = {
    jobGroupId: "noc82",
    parentClassificationSystemId: "noc",
    specification: "74",
    description: {
        en: "Major Group 82, supervisors and technical jobs in natural resources, agriculture and related production"
    },
    parentGroup: nocB
}

const noc92: JobGroup = {
    jobGroupId: "noc92",
    parentClassificationSystemId: "noc",
    specification: "92",
    description: {
        en: "Major Group 92, processing, manufacturing and utilities supervisors and central control operators"
    },
    parentGroup: nocB
}

const noc632: JobGroup = {
    jobGroupId: "noc632",
    parentClassificationSystemId: "noc",
    specification: "632",
    description: {
        en: "Monior Group 92, chefs and cooks"
    },
    parentGroup: nocB
}

const noc633: JobGroup = {
    jobGroupId: "noc633",
    parentClassificationSystemId: "noc",
    specification: "633",
    description: {
        en: "Minor Group 633, butchers and bakers"
    },
    parentGroup: nocB
}

const noc2016: JobClassification = {
    classificationSystemId: "noc",
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
        noc82,
        noc92,
        noc632,
        noc633,
    },
    jobTypes: [],
    reference: {
        url: "http://noc.esdc.gc.ca/English/NOC/OccupationIndex.aspx?ver=16"
    }
}

export default noc2016
