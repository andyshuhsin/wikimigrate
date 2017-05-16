import * as React from "react"
import {Combination} from "../../../../definitions/auxillary/Combination"
import {text} from "../../../utils/text"
import design from "../../design"

const style = {
    marginBottom: "0.4em",
    padding: "0.2em 0",
    fontFamily: "monospace",
    fontWeight: "bolder",
    background: design.colors.brandLighter
} as React.CSSProperties

const CombinationSubhead = (props: {combo: Combination<any>}) => (
    props.combo.meta && props.combo.meta.title
        ? <div style={style}>
              {text(props.combo.meta.title)}
          </div>
        : <noscript />
)

export default CombinationSubhead
