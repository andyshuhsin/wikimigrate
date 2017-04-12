import * as React from 'react'
import {Combination, isCombination} from "../../../definitions/auxillary/Combination"

import PrerequisiteBox from './PrerequisiteBox'
import JobNatureBox from './PrerequisiteBox/JobNatureBox'
import CombinationSubhead from "./CombinationSubhead"

const embeddedCombinationBoxStyle = {
    padding: "0.6em 0.3em",
    background: "rgba(0, 0, 0, 0.05)",
}

const combinatorStyle = {
    textAlign: "center",
    fontWeight: "bolder",
} as React.CSSProperties

function isPrerequisite(input: any): boolean {
    return !!input.prereqId
}

function isJobNature(input: any): boolean {
    return !!input.description
}

interface Props {
    combo: Combination<any>
    level: number
}

class CombinationBox extends React.PureComponent<Props, {}> {

    render() {
        const combo = this.props.combo
        const operatorText = combo.combinator
        return (
            <div style={this.props.level > 0 ? embeddedCombinationBoxStyle : {}}>
                <CombinationSubhead combo={combo} />
                {combo.operands.map(
                    (operand: any, index: number) => (
                        <div key={index}> {/* TOOD: Shouldn't use 'index' */}
                            <this.OperandView operand={operand} level={this.props.level + 1}/>
                            <div style={combinatorStyle}>
                                {
                                    index === combo.operands.length - 1
                                        ? ''
                                        : operatorText
                                }
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    }

    OperandView(props: {operand: any, level: number}): JSX.Element {
        if (isCombination(props.operand)) {
            return <CombinationBox combo={props.operand} level={props.level} />
        } else if (isPrerequisite(props.operand)) {
            return <PrerequisiteBox prereq={props.operand} />
        } else if (isJobNature(props.operand)) {
            return <JobNatureBox jobGroup={props.operand} />
        } else {
            console.warn("Cannot recognize operand type:", JSON.stringify(props.operand))
            return <div />
        }
    }
}

export default CombinationBox
