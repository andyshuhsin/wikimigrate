import * as React from 'react'
import PathBox from './PathBox'

import {
    Path
} from '../utils/definitions'

interface PathShowcaseProps {
    paths: Path[]
    onClick: (event: any) => void
}

const pathShowcaseStyle = {
    justifyContent: "space-around",
    overflow: "scroll",
    padding: "1em",
} as React.CSSProperties


// Ensure the last box is aligned to the left
const PathShowcase = (props: PathShowcaseProps) =>
    <div style={pathShowcaseStyle}>
        {
            props.paths.map((path: Path) =>
                <PathBox
                    path={path}
                    key={path.transitions.map(transition => transition.id).join('')}
                    onClick={
                        () => props.onClick(path)
                    }
                />
            )
        }
    </div>

export default PathShowcase
