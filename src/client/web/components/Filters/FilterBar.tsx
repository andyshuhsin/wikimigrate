import * as React from 'react'
import {text} from "../../../utils/text"
import design from "../../design"

interface FilterBarProps {
    onClick: () => void
    offset?: number | null
}

const FilterBar = (props: FilterBarProps) => (
    <div
        style={{
            position: "absolute",
            bottom: "0",
            fontSize: "1.3em",
            padding: "0.5em 0.7em",
            width: "100%",
            transform: `translateY(-${Number(props.offset)}px)`,
            transition: `transform ${design.durations.slide}s`,
            background: "white",
            cursor: "pointer",
        } as React.CSSProperties}
        onClick={props.onClick}
    >
        {
            text({
                en: "Filters & Settings",
                zh_hans: "筛选设置",
            })
        }
        <img
            style={{
                width: "1.3em",
                verticalAlign: "middle",
                transform: props.offset ? "rotate(0deg)" : "rotate(180deg)"
            } as React.CSSProperties}
            src={require("../../../assets/angle-down.svg")}
        />
    </div>
)

export default FilterBar
