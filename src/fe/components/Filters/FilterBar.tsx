import * as React from 'react'
import {text} from "../../utils/text"

const FilterBar = () => (
    <div style={{
        fontSize: "1em",
        padding: "0.5em"
    }}>
        {
            text({
                en: "Filters",
                zh: "更多筛选",
            })
        }
        <img
            style={{
                width: "1.2em",
                verticalAlign: "middle",
            } as React.CSSProperties}
            src={require("../../assets/angle-down.svg")}
        />
    </div>
)

export default FilterBar
