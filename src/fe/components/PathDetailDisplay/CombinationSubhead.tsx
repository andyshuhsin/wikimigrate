import * as React from "react"
import {Combination} from "../../../definitions/auxillary/Combination"
import {text} from "../../utils/text"

const style = {
    marginBottom: "0.4em",
    padding: "0.2em 0",
    fontFamily: "monospace",
    fontWeight: "bolder",
    background: "rgba(255, 204, 188, 0.8)"
} as React.CSSProperties

const CombinationSubhead = (props: {combo: Combination<any>}) => (
    props.combo.meta && props.combo.meta.title
        ? <div style={style}>
              {text(props.combo.meta.title)}
          </div>
        : <noscript />
)

export default CombinationSubhead
