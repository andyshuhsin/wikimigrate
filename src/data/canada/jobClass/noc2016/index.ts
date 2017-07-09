import { JobClassification, JobGroup } from '../../../../definitions/auxiliary/JobClassification'

// See: http://noc.esdc.gc.ca/English/noc/Introduction.aspx?ver=16#struc

export const noc0: JobGroup = {
    jobGroupId: 'noc0',
    system: 'noc',
    designation: '0',
    description: {
        en: 'Management occupations',
        zh_hans: '管理职务',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314244&CPV=0&CST=01012016&CLV=1&MLV=4',
    },
}

export const noc00: JobGroup = {
    jobGroupId: 'noc0',
    system: 'noc',
    designation: '00',
    description: {
        en: 'Senior management occupations',
        zh_hans: '高级管理职务',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314245&CPV=00&CST=01012016&CLV=2&MLV=4',
    },
}

export const nocA: JobGroup = {
    jobGroupId: 'nocA',
    system: 'noc',
    designation: 'A',
    description: {
        en: 'Professional jobs',
        zh_hans: '专业工作',
    },
    lineage: [],
    reference: {
        url: 'http://www.cic.gc.ca/english/immigrate/skilled/noc.asp',
    },
}

export const nocB: JobGroup = {
    jobGroupId: 'nocB',
    system: 'noc',
    designation: 'B',
    description: {
        en: 'Technical jobs and skilled trades',
        zh_hans: '技术工作和技能工种',
    },
    lineage: [],
    reference: {
        url: 'http://www.cic.gc.ca/english/immigrate/skilled/noc.asp',
    },
}

export const nocC: JobGroup = {
    jobGroupId: 'nocC',
    system: 'noc',
    designation: 'C',
    description: {
        en: 'Intermediate jobs',
        zh_hans: '中级工作',
    },
    lineage: [],
    reference: {
        url: 'http://www.cic.gc.ca/english/immigrate/skilled/noc.asp',
    },
}

export const nocD: JobGroup = {
    jobGroupId: 'nocD',
    system: 'noc',
    designation: 'D',
    description: {
        en: 'Labour jobs',
        zh_hans: '体力工作',
    },
    lineage: [],
    reference: {
        url: 'http://www.cic.gc.ca/english/immigrate/skilled/noc.asp',
    },
}

export const noc72: JobGroup = {
    jobGroupId: 'noc72',
    system: 'noc',
    designation: '72',
    description: {
        en: 'Industrial, electrical and construction trades',
        zh_hans: '工业、电器和建筑工种',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314245&CPV=72&CST=01012016&CLV=2&MLV=4'
    }
}

export const noc73: JobGroup = {
    jobGroupId: 'noc73',
    system: 'noc',
    designation: '73',
    description: {
        en: 'Maintenance and equipment operation trades',
        zh_hans: '维修和设备操作工种',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314245&CPV=73&CST=01012016&CLV=2&MLV=4'
    }
}

export const noc82: JobGroup = {
    jobGroupId: 'noc82',
    system: 'noc',
    designation: '74',
    description: {
        en: 'Supervisors and technical jobs in natural resources, agriculture and related production',
        zh_hans: '监督和自然资源、农业和相关生产领域的技术工作',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314245&CPV=82&CST=01012016&CLV=2&MLV=4'
    }
}

export const noc92: JobGroup = {
    jobGroupId: 'noc92',
    system: 'noc',
    designation: '92',
    description: {
        en: 'Processing, manufacturing and utilities supervisors and central control operators',
        zh_hans: '加工、制造和基础设施的监督和中央控制操作员',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314245&CPV=92&CST=01012016&CLV=2&MLV=4'
    }
}

export const noc632: JobGroup = {
    jobGroupId: 'noc632',
    system: 'noc',
    designation: '632',
    description: {
        en: 'Chefs and cooks',
        zh_hans: '厨师',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314246&CPV=632&CST=01012016&CLV=3&MLV=4'
    }
}

export const noc633: JobGroup = {
    jobGroupId: 'noc633',
    system: 'noc',
    designation: '633',
    description: {
        en: 'Butchers and bakers',
        zh_hans: '屠宰师和烘焙师',
    },
    lineage: [],
    reference: {
        url: 'http://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=314243&CVD=314246&CPV=633&CST=01012016&CLV=3&MLV=4'
    }
}

export const noc2016: JobClassification = {
    classificationSystemId: 'noc',
    regionId: 'canada',
    title: {
        en: 'National Occupational Classification',
    },
    titleShort: {
        en: 'NOC',
    },
    version: '2016',
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
        url: 'http://noc.esdc.gc.ca/English/NOC/OccupationIndex.aspx?ver=16',
    },
}

export default noc2016
