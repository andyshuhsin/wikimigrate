import * as React from 'react'
import {CertificationPrereq} from "../../../../definitions/Prerequisites/CertificationPrereq"
import {LangId} from "../../../../definitions/auxillary/MultiLang"
import {text} from "../../../utils/text"

const CertificationBox = (props: {prereq: CertificationPrereq, lang: LangId}) => {
    if (props.lang === "zh_hans") {
        return (
            <div>
                您有以下证书<br />
                {text(props.prereq.description)}
            </div>
        )
    }
    else {
        return (
            <div>
                You have certification: <br />
                {text(props.prereq.description)}
            </div>
        )
    }
}

export default CertificationBox
