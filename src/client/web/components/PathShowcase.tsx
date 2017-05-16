import * as React from 'react'
import PathBox from './PathBox'
import Title from './Title'

import {
    Path
} from '../../utils/definitions'
import {text} from "../../utils/text"

interface PathShowcaseProps {
    paths: Path[]
    onClick: (event: any) => void
}

const pathShowcaseStyle = {
    justifyContent: "space-around",
    overflow: "scroll",
    padding: "1em",
    paddingBottom: "3em",
} as React.CSSProperties


// Ensure the last box is aligned to the left
const PathShowcase = (props: PathShowcaseProps) =>
    <div style={pathShowcaseStyle}>
        <Title text={
            text({
                en: "Mobility options for you",
                zh_hans: "签证选项",
            })
        } />
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
