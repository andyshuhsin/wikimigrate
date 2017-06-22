import * as React from 'react'
import { Procedure } from '../../../../../definitions/auxiliary/Paperwork'
import { text } from '../../../../utils/text'
import { Details } from '../../Foundational/Details'
import { DocumentRequirement, DocumentRequirementFormat, Party } from '../../../../../definitions/auxiliary/Document'
import { MultiLangStringSet } from '../../../../../definitions/auxiliary/MultiLang'
import { Mapping } from '../../../../../definitions/auxiliary/Mapping'
import design from '../../../design'

interface Props {
    procedureList: Procedure[]
}

const documentRequirementBoxStyle: React.CSSProperties = {
    position: 'relative',
    margin: '1em 0'
}

const requirementTitleStyle: React.CSSProperties = {
    fontSize: '1em',
    margin: '0.2em 0',
}

const labelStyle: React.CSSProperties = {
    margin: '0.5em',
    padding: '1px 0.5em',
    background: design.colors.greyMedium,
    color: design.colors.greyLight,

    // FIXME: autoprefixer
    userSelect: 'none',
    webkitUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
}

const formatTextTable: {[key in DocumentRequirementFormat]: MultiLangStringSet} = {
    original: {
        en: 'Original',
        zh_hans: '原版'
    },
    copy: {
        en: 'Copy',
        zh_hans: '复印版'
    }
}

const partyTextTable: Mapping<Party, MultiLangStringSet> = {
    principal: {
        en: 'Principal applicant',
        zh_hans: '主申请人',
    },
    spouse: {
        en: 'Spouse',
        zh_hans: '配偶',
    },
    dependent_child: {
        en: 'Dependent children',
        zh_hans: '受养子女',
    },
    'dependent_child_18+': {
        en: 'Dependent children (18 years old or older)',
        zh_hans: '受养子女(18岁或以上)',
    },
    'dependent_child_18-': {
        en: 'Dependent children (younger than 18 years old)',
        zh_hans: '受养子女(18岁以下)',
    }
}

const DocumentRequirementBox = (props: {requirement: DocumentRequirement}) => {

    return (
        <section style={documentRequirementBoxStyle}>
            <h6 style={requirementTitleStyle}>
                <a href={props.requirement.document.url} target='_blank'>
                    {text(props.requirement.document.title)}
                </a>
                {props.requirement.ifApplicable &&

                 <span style={labelStyle}>
                     {
                         text({
                             en: 'if applicable',
                             zh_hans: '如适用',
                         })
                     }
                 </span>
                }
            </h6>

            <p>
                {text(props.requirement.description)}
            </p>


            {props.requirement.format &&
             <p>
                 {text({
                     en: 'Format:',
                     zh_hans: '版本：'
                 })}
                 {' '}
                 {text(formatTextTable[props.requirement.format])}
             </p>
            }

            {props.requirement.parties &&
             <p>
                 {text({
                     en: 'Required for: ',
                     zh_hans: '以下人士需要递交： '
                 })}
                 {props.requirement.parties.map(party =>
                    <span key={party}>
                        {'・' + text(partyTextTable[party])}
                    </span>
                 )}
             </p>
            }

        </section>
    )
}

class ProcedureBox extends React.PureComponent<Props, {}> {
    render() {
        const documentRequirementTitle = text({
            en: 'List of Required Documents',
            zh_hans: '材料要求',
        })

        return (
            <div>
                {this.props.procedureList.map(
                    (procedure: Procedure, index: number) => (
                        <div
                            key={text(procedure.name)}
                            style={{
                                marginBottom: '0.5em',
                            }}
                        >
                            {index + 1}
                            {'. '}
                            {text(procedure.name)}
                            {procedure.instruction &&
                             <div style={{
                                 marginLeft: '2em',
                             }}>
                                 {text(procedure.instruction.text)} {' '}
                                 {procedure.instruction.link &&
                                  <a href={procedure.instruction.link.url} target='_blank'>
                                      {procedure.instruction.link.url}
                                  </a>
                                 }
                                 {procedure.documentRequirements &&
                                  <Details summary={documentRequirementTitle}>
                                      {procedure.documentRequirements.map(req =>
                                          <DocumentRequirementBox
                                              requirement={req}
                                              key={JSON.stringify(req)}
                                          />
                                      )}
                                  </Details>
                                 }
                             </div>
                            }
                        </div>
                    ),
                )}
            </div>
        )
    }
}

export default ProcedureBox
