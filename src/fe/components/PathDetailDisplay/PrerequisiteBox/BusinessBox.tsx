import * as React from "react"
import {BusinessPrereq} from "../../../../definitions/Prerequisites/BusinessPrereq"
import data from "../../../../data/index"

const BusinessBox = (props: {prereq: BusinessPrereq}) => (
    <div>
        {console.info(props.prereq.schemes)}
        {props.prereq.schemes.map(scheme => (
            <div key={scheme.condition.duration.value}>
                Your business turnover is {" "}
                {data.common.currencies[scheme.condition.turnover.currencyId].code}
                {" "}
                {scheme.condition.turnover.value.toLocaleString()}
                {" with in "}
                {scheme.condition.duration.value}
                {" "}
                {scheme.condition.duration.unit}
            </div>
        ))}
    </div>
)

export default BusinessBox
