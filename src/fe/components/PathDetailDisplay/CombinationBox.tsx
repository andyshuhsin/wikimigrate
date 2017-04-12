import * as React from 'react'
import {Combination, isCombination} from "../../../definitions/auxillary/Combination"

import PrerequisiteBox from './PrerequisiteBox'
import JobNatureBox from './PrerequisiteBox/JobNatureBox'
import CombinationSubhead from "./CombinationSubhead"
import {text} from "../../utils/text"

const embeddedCombinationBoxStyle = {
    margin: "0.8em 0",
    background: "rgba(0, 0, 0, 0.05)",
}

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

const branchStyle = {
    or: {
        marginLeft: "1em"
    } as React.CSSProperties,

    and: {

    } as React.CSSProperties,
}

class CombinationBox extends React.PureComponent<Props, {}> {

    render() {
        const combo = this.props.combo
        return (
            <div style={this.props.level > 0 ? embeddedCombinationBoxStyle : {}}>
                <CombinationSubhead combo={combo} />
                {
                    combo.combinator === "or" && combo.operands.length >= 3
                    ? text({
                        en: "One of"
                    })
                    : ''
                }
                <div style={branchStyle[combo.combinator]}>
                    {combo.operands.map(
                        (operand: any, index: number) => (
                            <div key={index}> {/* TOOD: Shouldn't use 'index' */}
                                <this.OperandView operand={operand} level={this.props.level + 1}/>
                                {
                                    combo.operands.length === 2
                                    && index === 0
                                    && (
                                        <div style={
                                            this.props.level === 0
                                            ? {marginTop: "0.5em"}
                                            : {}
                                        }>
                                            {combo.combinator}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    )}
                </div>
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
