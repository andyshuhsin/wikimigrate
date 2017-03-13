import {
    Transition,
    allOf
} from '../../common'

// TODO: complete country profiles to add proper object-based status
const ns = () => ({})

const visaExemption: Transition = {
    id: "visa_exemption",
    name: {
        en: "Canada Visa Exemption",
    },
    acquireBy: "application",
    from: [
        ns("usa", "citizen"),
        ns("usa", "permanent"),
        ns("eu", "citizen"),
        ns("taiwan", "citizen"),
    ],
    to: ns("canada", "tourist_visa_exempted"),
    prerequisiteList: allOf([
        {
            id: "eta"
        }
    ]),
    procedureList: [
        {
            name: {
                en: "Apply at Border",
            }
        }
    ],
    exceptionList: [
        {
            // Bulgarians and Romanians need visa despite being EU citizens
            appliedTo: [
                ns("bulgaria", "citizen"),
                ns("romania", "citizen"),
            ],
            effects: [
                {
                    property: 'DQ',
                    value: null,
                }
            ]
        },
        {
            // US citizens don't need eTA
            appliedTo: [
                ns("usa", "citizen")
            ],
            effects: [
                {
                    property: 'prerequisiteList',  // FIXME: Could break on key rename
                    value: []
                }
            ]
        }
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/visit/visas.asp",
            title: {
                en: "Find out if you need an Electronic Travel Authorization (eTA) or a visitor visa"
            }
        }
    ]
}

export default visaExemption