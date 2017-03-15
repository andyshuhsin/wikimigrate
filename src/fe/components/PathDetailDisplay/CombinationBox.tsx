import * as React from 'react'
import {
    Transition,
    Prerequisite,
    Combination,
} from '../../../data/common'

import PrerequisiteBox from './PrerequisiteBox'
import JobTypeBox from './PrerequisiteBox/JobTypeBox'

const comboBoxStyle = {
    border: "1px black",
    padding: "1em 0 1em 2em",
    opacity: 0.9,
    background: "#ccc"
}

function isCombination(input: any): boolean {
    return !!input.operator
}

function isPrerequisite(input: any): boolean {
    return !!input.property
}

function isJobType(input: any): boolean {
    return !!input.description
}

interface Props {
    combo: Combination<any>
}

class CombinationBox extends React.PureComponent<Props, {}> {

    OperandView(props: {operand: any}) {
        if (isCombination(props.operand)) {
            return <CombinationBox combo={props.operand} />
        } else if (isPrerequisite(props.operand)) {
            return <PrerequisiteBox prereq={props.operand} />
        } else if (isJobType(props.operand)) {
            return <JobTypeBox jobType={props.operand} />
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
