import * as React from "react"
import AgePrereq from "../../../../definitions/Prerequisites/AgePrereq"
import inflect from "../../../utils/inflect"

const AgeBox = (props: {prereq: AgePrereq}) => (
    <div>
        Your age is
        {" "}
        {props.prereq.value[0]}
        {" "}
        {props.prereq.value[1].value}
        {" "}
        {inflect(props.prereq.value[1].unit, {
            number: props.prereq.value[1].value
        })}
        {" old"}
    </div>
)

export default AgeBox
