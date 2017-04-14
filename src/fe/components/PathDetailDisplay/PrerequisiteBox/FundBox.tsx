import * as React from 'react'

import data from '../../../../data'
import {FundPrereq, FundPrereqCondition} from "../../../../definitions/Prerequisites/FundPrereq"
import {text} from "../../../utils/text"

function stringifyCondition(condition: Partial<FundPrereqCondition>) {
    if (condition.familyMember) {
        return ` if you have ${condition.familyMember} family members`
    }
    else if (condition.source) {
        return (
            <span>
                from {" "}
                <a href={condition.source.reference.url}>
                    {text(condition.source.name)}
                </a>
            </span>
        )
    }
    else {
        console.warn("Unimplemented: FundPreq scheme condition", condition)
        return ''
    }
}

const FundBox = (props: {prereq: FundPrereq}) => {
    if (props.prereq.type === "possess") {
        return (
            <div>
                You have
                {
                    props.prereq.schemes.map((scheme) =>
                        scheme.fund && <div key={JSON.stringify(scheme)}>
                            {data.common.currencies[scheme.fund.currencyId].code}
                            {" "}
                            {scheme.fund.value.toLocaleString(data.app.lang, {
                                style: "decimal",
                                currency: scheme.fund.currencyId
                            })}
                            {
                                scheme.condition && stringifyCondition(scheme.condition)
                            }
                        </div>
                    )
                }
            </div>
        )
    }
    else if (props.prereq.type === "investee") {
        return (
            <div>
                {props.prereq.schemes.map(scheme => (
                    scheme.fund
                    ? (
                        <div key={JSON.stringify(scheme)}>
                            You received {" "}
                            {data.common.currencies[scheme.fund.currencyId].code}
                            {" "}
                            {scheme.fund.value.toLocaleString(data.app.lang, {
                                style: "decimal",
                                currency: scheme.fund.currencyId
                            })}
                            {" "}
                            investment
                            {" "}
                            {scheme.condition && stringifyCondition(scheme.condition)}
                        </div>
                    )
                    : (
                        <div key={JSON.stringify(scheme)}>
                            No fund required if you have endorsement {" "}
                            {scheme.condition && stringifyCondition(scheme.condition)}
                        </div>
                    )
                ))}
            </div>
        )
    }
    else {
        console.warn("Unimplemented: cannot handle FundPreq", props.prereq)
        return <noscript />
    }
}

export default FundBox
