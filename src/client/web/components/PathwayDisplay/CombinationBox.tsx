import * as React from 'react'
import { Combination, isCombination } from '../../../../definitions/auxiliary/Combination'

import PrerequisiteBox from './PrerequisiteBox'
import JobGroupBox from './PrerequisiteBox/JobGroupBox'
import CombinationSubhead from './CombinationSubhead'
import { text } from '../../../utils/text'
import { isJobGroup } from '../../../../definitions/auxiliary/JobClassification'
import { operators } from '../../../../data/common/operators'
import { LangId } from '../../../../definitions/auxiliary/MultiLang'

const embeddedCombinationBoxStyle = {
    margin: '0.8em 0',
    background: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: '0.2em',
}

function isPrerequisite(input: any): boolean {
    return !!input.prereqId
}

const branchStyle = {
    or: {
        marginLeft: '1em',
    } as React.CSSProperties,

    and: {} as React.CSSProperties,

    not: {} as React.CSSProperties,
}

const operandViewStyle = {
    marginBottom: '0.2em',
} as React.CSSProperties

interface Props {
    combo: Combination<any>
    level: number
    lang: LangId
}


class CombinationBox extends React.PureComponent<Props, {}> {

    render() {
        const combo = this.props.combo
        return (
            <div style={this.props.level > 0 ? embeddedCombinationBoxStyle : {}}>
                <CombinationSubhead combo={combo}/>
                {
                    combo.combinator === 'or' && combo.operands.length >= 3
                        ? <span style={{fontVariant: 'small-caps'}}>
                              {text({
                                  en: 'One of',
                                  zh_hans: '至少满足一项：',
                              })}
                          </span>
                        : ''
                }
                <div style={branchStyle[combo.combinator]}>
                    {combo.operands.map(
                        (operand: any, index: number) => (
                            <div
                                style={operandViewStyle}
                                key={JSON.stringify(operand) /* FIXME: Excessive? */}
                            >
                                <this.OperandView
                                    operand={operand}
                                    level={this.props.level + 1}
                                    lang={this.props.lang}
                                />
                                {
                                    combo.operands.length === 2
                                    && index === 0
                                    && (
                                        <div style={
                                            this.props.level === 0
                                                ? {
                                                    marginTop: '0.5em',
                                                    fontVariant: 'small-caps',
                                                }
                                                : {
                                                    fontVariant: 'small-caps',
                                                }
                                        }>
                                            {text(operators[combo.combinator].name)}
                                        </div>
                                    )
                                }
                            </div>
                        ),
                    )}
                </div>
            </div>
        )
    }

    OperandView(props: { operand: any, level: number, lang: LangId }): JSX.Element {
        if (isCombination(props.operand)) {
            return <CombinationBox combo={props.operand} level={props.level} lang={props.lang}/>
        }
        else if (isPrerequisite(props.operand)) {
            return <PrerequisiteBox prereq={props.operand} lang={props.lang}/>
        }
        else if (isJobGroup(props.operand)) {
            return <JobGroupBox jobGroup={props.operand}/>
        }
        else {
            console.warn('Cannot recognize operand type:', JSON.stringify(props.operand))
            return <div />
        }
    }
}

export default CombinationBox
