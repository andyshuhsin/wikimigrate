import * as React from 'react'
import {Condition} from "../../../definitions/auxillary/Combination";

import PrerequisiteBox from './PrerequisiteBox'
import JobNatureBox from './PrerequisiteBox/JobNatureBox'

const comboBoxStyle = {
    padding: "0.3em 0 1em 1em",
}

function isCombination(input: any): boolean {
    return !!input.operator
}

function isPrerequisite(input: any): boolean {
    return !!input.prereqId
}

function isJobNature(input: any): boolean {
    return !!input.description
}

interface Props {
    combo: Condition<any>
}

class CombinationBox extends React.PureComponent<Props, {}> {

    OperandView(props: {operand: any}): JSX.Element {
        if (isCombination(props.operand)) {
            return <CombinationBox combo={props.operand} />
        } else if (isPrerequisite(props.operand)) {
            return <PrerequisiteBox prereq={props.operand} />
        } else if (isJobNature(props.operand)) {
            return <JobNatureBox jobGroup={props.operand} />
        } else {
            console.warn("Cannot recognize operand type:", JSON.stringify(props.operand))
            return <div />
        }
    }

    render() {
        const combo = this.props.combo
        const operatorText = combo.operator
        return (
            <div style={comboBoxStyle}>
                {
                    combo.operands.map(
                        (operand: any, index: number) => (
                            <div key={index}> {/* TOOD: Shouldn't use 'index' */}
                                <this.OperandView operand={operand} />
                                <div>
                                    { 
                                        index === combo.operands.length - 1
                                        ? ''
                                        : operatorText 
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default CombinationBox
