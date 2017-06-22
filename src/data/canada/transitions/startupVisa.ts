import Transition from '../../../definitions/Transition'
import { allOf, oneOf } from '../../../definitions/auxiliary/Combination'

import { alien, pr } from '../status'
import { FundPrereq } from '../../../definitions/Prerequisites/FundPrereq'
import { money } from '../../../definitions/auxiliary/Money'
import { designatedAngelInvestors, designatedBusinessIncubators, designatedVentureCapitalFunds } from '../fundSources'
import { Document, DocumentRequirement } from '../../../definitions/auxiliary/Document'

const birthCertificate: Document = {
    id: 'birth',
    title: {
        en: 'Birth certificates'
    }
}


const startupVisa: Transition = {
    id: 'startup_visa_ca',
    regionId: 'canada',
    acquireBy: 'application',
    name: {
        en: 'Startup Visa',
        zh_hans: '创业签证',
        zh_hant: '創業簽證',
    },
    from: alien,
    to: pr,
    prerequisiteList: allOf([
        oneOf([
            {
                prereqId: 'fund',
                type: 'investee',
                schemes: [
                    {
                        fund: money(200000, 'cad'),
                        condition: {
                            source: designatedVentureCapitalFunds,
                        },
                    },
                ],
            } as FundPrereq,
            {
                prereqId: 'fund',
                type: 'investee',
                schemes: [
                    {
                        fund: money(75000, 'cad'),
                        condition: {
                            source: designatedAngelInvestors,
                        },
                    },
                ],
            } as FundPrereq,
            {
                prereqId: 'fund',
                type: 'admission',
                schemes: [
                    {
                        fund: null,
                        condition: {
                            source: designatedBusinessIncubators,
                        },
                    },
                ],
            } as FundPrereq,
        ], {
            title: {
                en: 'Venture investment',
                zh_hans: '风险投资',
            },
        }),
    ]),
    procedureList: [
        //@see http://www.cic.gc.ca/english/immigrate/business/start-up/apply.asp
        //@see http://www.cic.gc.ca/english/information/applications/guides/5759ETOC.asp
        {
            id: 'form_validate',
            name: {
                en: 'Fill and validate application form',
            },
            instruction: {
                link: {
                    url: 'http://www.cic.gc.ca/english/pdf/kits/forms/IMM0008ENU_2D.pdf'
                }
            }
        },
        {
            id: 'form_print',
            name: {
                en: 'Print, sign, and date the validated form',
            },
        },
        {
            id: 'document',
            name: {
                en: 'Prepare documents',
            },
            instruction: {},

            //@see http://www.cic.gc.ca/english/pdf/kits/forms/IMM5760E.pdf
            documentRequirements: [
                {
                    document: {
                        id: 'imm0008',
                        title: {
                            en: 'Generic Application Form to Canada (IMM 0008)'
                        },
                        url: 'http://www.cic.gc.ca/english/pdf/kits/forms/IMM0008ENU_2D.pdf',
                    },
                    format: 'original',
                    parties: ['principal'],
                },
                {
                    document: {
                        id: 'imm0008dep',
                        title: {
                            en: 'Additional Dependants/Declaration (IMM 0008DEP)'
                        },
                        url: 'http://www.cic.gc.ca/english/pdf/kits/forms/IMM0008DEPENU.pdf',
                    },
                    description: {
                        en: 'if the applicant has more than five dependants (whether they are accompanying or not).'
                    },
                    format: 'original',
                    parties: ['principal'],
                },
                {
                    document: {
                        id: 'imm5669',
                        title: {
                            en: 'Schedule A: Background/Declaration (IMM 5669)'
                        },
                        url: 'http://www.cic.gc.ca/english/pdf/kits/forms/imm5669E.pdf'
                    },
                    format: 'original',
                    parties: ['principal', 'spouse', 'dependent_child'],
                },
                {
                    document: {
                        id: 'imm5562',
                        title: {
                            en: 'Supplementary Information - Your Travels (IMM 5562)'
                        },
                        url: 'http://www.cic.gc.ca/english/pdf/kits/forms/IMM5562E.pdf'
                    },
                    format: 'original',
                    parties: ['principal'],
                },
                {
                    document: {
                        id: 'imm0008-schedule13',
                        title: {
                            en: 'Schedule 13 - Business Immigration Programs - Start Up Business Class (IMM 0008 - Schedule 13)'
                        },
                        url: 'http://www.cic.gc.ca/english/pdf/kits/forms/imm0008_13e.pdf'
                    },
                    format: 'original',
                    parties: ['principal'],
                },
                {
                    document: {
                        id: 'imm5406',
                        title: {
                            en: 'Additional Family Information (IMM 5406)'
                        },
                        url: 'http://www.cic.gc.ca/english/pdf/kits/forms/IMM5406E.pdf'
                    },
                    format: 'original',
                    parties: ['principal', 'spouse', 'dependent_child_18+'],
                },
                {
                    document: {
                        id: 'imm5476',
                        title: {
                            en: 'Use of a Representative (IMM 5476)'
                        },
                        url: 'Use of a Representative (IMM 5476)'
                    },
                    description: {
                        en: 'If you have a paid or unpaid representative'
                    },
                    format: 'original',
                    parties: ['principal'],
                },
                {
                    document: {
                        id: 'passport',
                        title: {
                            en: 'Travel documents and passports'
                        }
                    },
                    description: {
                        en: 'Copy of the pages of your passport or travel documents showing: • the passport number, • date of issue and expiry, • the photo, name, date and place of birth, • pages showing any amendments in name, date of birth, expiration, etc. You must hold a valid regular passport. Diplomatic, official, service or public affairs passports are not valid for immigration to Canada. If you live in a country other than your country of nationality, include a photocopy of your visa for the country in which you currently live.'
                    },
                    format: 'copy',
                    parties: ['principal', 'spouse', 'dependent_child'],
                },
                {
                    document: {
                        id: 'language',
                        title: {
                            en: 'Proof of language proficiency'
                        }
                    },
                    format: 'original'
                },
                {
                    document: {
                        id: 'letter_of_support',
                        title: {
                            en: 'Letter of Support'
                        }
                    },
                    description: {
                        en: 'You must provide a Letter of Support with your application. The Letter of Support will be given to you by the designed entity which is investing in your business proposal.'
                    },
                    format: 'original'
                },
                {
                    document: birthCertificate,
                    format: 'copy',
                    parties: ['principal', 'spouse'],
                },
                {
                    document: {
                        id: 'name_date_change',
                        title: {
                            en: 'Legal documents showing name or date of birth changes'
                        }
                    },
                    format: 'copy',
                    ifApplicable: true,
                    parties: ['principal', 'spouse'],
                },
                {
                    document: {
                        id: 'marriage',
                        title: {
                            en: 'Marriage certificate(s), final divorce or annulment certificate(s)',
                        }
                    },
                    description: {
                        en: 'If married more than once, include certificates from each marriage and divorce or annulment you, your spouse or common-law partner have had;'
                    },
                    format: 'copy',
                    parties: ['principal', 'spouse'],
                },
                {
                    document: {
                        id: 'death_spouse',
                        title: {
                            en: 'Death certificate for former spouse(s) or common-law partner(s)',
                        }
                    },
                    format: 'copy',
                    parties: ['principal', 'spouse'],
                    ifApplicable: true,
                },
                {
                    document: {
                        id: 'national_id',
                        title: {
                            en: 'National IDs, family/household registry/book',
                        }
                    },
                    format: 'copy',
                    parties: ['principal', 'spouse'],
                    ifApplicable: true,
                },
                {
                    document: {
                        id: 'imm5409',
                        title: {
                            en: 'Statutory Declaration of Common-Law Union',
                        }
                    },
                    description: {
                        en: 'If you have a common-law partner, complete and include the Statutory Declaration of Common-Law Union (IMM 5409 – original) and provide evidence that you have cohabited with your partner for a period of at least 12 continuous months. Provide the following documents listing both your names, for example: • copies of joint bank account statements, • copies of leases, • utility bills, etc.'
                    },
                    format: 'copy',
                    ifApplicable: true,
                },
                {
                    document: birthCertificate,
                    ifApplicable: true,
                    format: 'copy',
                    parties: ['dependent_child']
                },
                {
                    document: {
                        id: 'adoption_paper',
                        title: {
                            en: 'Adoption papers'
                        }
                    },
                    description: {
                        en: 'Adoption papers issued by recognized national authorities showing the legal, approved adoption of adopted dependent children'
                    },
                    ifApplicable: true,
                    format: 'copy',
                    parties: ['dependent_child']
                },
                {
                    document: {
                        id: 'proof_of_custody',
                        title: {
                            en: 'Proof of full custody'
                        }
                    },
                    description: {
                        en: 'Proof of full custody for children under the age of 18 and proof that the children may be removed from the jurisdiction of the court'
                    },
                    ifApplicable: true,
                    format: 'copy',
                },
                {
                    document: {
                        id: 'imm5604',
                        title: {
                            en: 'Statutory Declaration from Non-Accompanying Parent/Guardian for Minors Immigrating to Canada'
                        }
                    },
                    description: {
                        en: `If the other parent of your children is not accompanying you to Canada, you must submit a signed Statutory Declaration from Non- Accompanying Parent/Guardian for Minors Immigrating to Canada (IMM 5604 - original). You must submit one form for each child and a copy of the non-accompanying parent's photo ID showing their signature`
                    },
                    format: 'original',
                    ifApplicable: true,
                },
                {
                    document: {
                        id: 'proof_child_financial_support',
                        title: {
                            en: 'Proof of financial support for child 19 years of age or older'
                        }
                    },
                    description: {
                        en: `You must submit proof if the child is 19 years of age or older and depends substantially on the financial support of the parent since before the age of 19 and is unable to be financially self-supporting due to a physical or mental condition.`
                    },
                    format: 'copy',
                },
                {
                    document: {
                        id: 'police_certificate',
                        title: {
                            en: 'Police Certificates and Clearances'
                        }
                    },
                    description: {
                        en: 'You must get a police certificate from each country or territory where you have lived for six or more months in a row since the age of 18. You are strongly encouraged to submit your police certificates with your application to the CIO. If you are unable to obtain all the necessary police certificates, you may still send your application to the CIO without them. However, we strongly recommend that you take steps to obtain your police certificates now to avoid future delays. You must be ready to submit them when requested by an officer.'
                    },
                    format: 'original'
                },
                {
                    document: {
                        id: 'photo',
                        title: {
                            en: 'Photo'
                        },
                    },
                    description: {
                        en: 'Include two (2) photos for each member of your family, whether accompanying or not, and yourself. Follow the instructions provided in Appendix A: Photo Specifications. Photos must have been taken within six (6) months before application submission. On the back of one (1) of the photographs, write the name and date of birth of the person who appears in the photo as well as the date the photo was taken. Leave the other photograph blank.'
                    },
                    format: 'original',
                    parties: ['principal', 'spouse', 'dependent_child'],
                },
                {
                    document: {
                        id: 'payment',
                        title: {
                            en: 'Fee Payment'
                        }
                    },
                    description: {
                        en: 'Do no enclose cash.'
                    },
                    format: 'original'
                },
                {
                    document: {
                        id: 'settlement_funds',
                        title: {
                            en: 'Settlement Funds'
                        },
                    },
                    description: {
                        en: 'Provide proof of readily transferable funds in a convertible currency available for settlement in Canada: • current bank certification letter; or • evidence of savings balance; or • fixed or time deposit statements. In addition, you may be required to disclose all assets and liabilities belonging to you and your spouse or common-law partner. Do not provide supporting documents at this point. If necessary, you will be asked to provide supporting documentation later in the process.'
                    },
                    format: 'copy',
                }
            ]
        },
        {
            id: 'mail',
            name: {
                en: 'Mail the Application'
            }
        },
        {
            id: 'wait',
            name: {
                en: 'Wait for results'
            }
        },
    ],
    referenceList: [
        {
            title: {
                en: 'Official page',
                zh_hans: '官方主页',
            },
            url: 'http://www.cic.gc.ca/english/immigrate/business/start-up/',
        },
    ],
}

export default startupVisa
