import * as React from "react"
import {Combination} from "../../../definitions/auxillary/Combination"
import {text} from "../../utils/text"

const style = {
    fontWeight: "bolder"
} as React.CSSProperties

const CombinationSubhead = (props: {combo: Combination<any>}) => (
    props.combo.meta && props.combo.meta.title
        ? <div style={style}>
              {text(props.combo.meta.title)}
          </div>
        : <noscript />
)

export default CombinationSubhead
