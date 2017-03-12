import {
    Transition,
    allOf
} from '../../common'

const quebecSkilled: Transition = {
    id: "quebec_selected_skilled_workds",
    acquireBy: "application",
    name: {
        en: "Quebec-selected Skilled Workers"
    },
    prerequisiteList: allOf([]),
    from: {countryId: "canada", statusId: "alien"},
    to: {countryId: "canada", statusId: "permanent"},
    procedureList: [
        {
            "name": {
                "en": "Apply to Quebec government"
            }
        },
        {
            "name": {
                "en": "Apply to CIC"
            }
        }
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/immigrate/quebec/index.asp",
            title: {
                en: "Official Website"
            }
        }
    ]
}

export default quebecSkilled