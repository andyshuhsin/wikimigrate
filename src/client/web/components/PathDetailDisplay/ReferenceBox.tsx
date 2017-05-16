import * as React from "react"
import URLDatum from "../../../../definitions/auxillary/URLDatum"
import {text} from "../../../utils/text"

const ReferenceBox = (props: {referenceList: URLDatum[]}) => (
    <div>
        {
            props.referenceList.map(reference => (
                <div key={reference.url}>
                    <a href={reference.url} target="_blank">
                        {text(reference.title)}
                    </a>
                </div>
            ))
        }
    </div>
)

export default ReferenceBox
