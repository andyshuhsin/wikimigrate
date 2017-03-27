import * as React from 'react'
import PathBox from './PathBox'

import {
    Path
} from '../utils/definitions'

interface PathShowcaseProps {
    paths: Path[]
    boxClick: (event: any) => void
}

const pathShowcaseStyle = {
    justifyContent: "space-around",
    maxHeight: "50vh",
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
                    boxClick={
                        () => props.boxClick(path)
                    }
                />
            )
        }
    </div>

export default PathShowcase
