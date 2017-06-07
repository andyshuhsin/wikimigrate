import * as React from 'react'
import text from '../../utils/text'

import { Pathway, PathwayDescriptor } from '../../utils/definitions'

import data from '../../../data'
import design from '../design'
import { formPath } from '../../utils/urlpath'

interface PathShowcaseProps {
    path: Pathway
    onClick: () => void
}

const boxStyle = {
    display: "block",
    marginBottom: '0.625em',

    maxHeight: '200px',
    padding: '1.7em 1em',

    fontSize: '1.2em',
    textAlign: 'center',
    background: design.colors.brandLighter,
    wordWrap: 'break-work',
    overflow: 'hidden',
    cursor: 'pointer',
} as React.CSSProperties

const countryNameStyle = {
    font: 'normal 1.2em sans-serif',
    margin: 0,
    marginBottom: '0.3em',
} as React.CSSProperties

const pathNameStyle = {
    font: 'normal 1.2em sans-serif',
    margin: 0,
} as React.CSSProperties

class PathwayBox extends React.PureComponent<PathShowcaseProps, {}> {
    render() {
        const transitions = this.props.path.transitions
        const targetRegion = data.getRegionById(transitions[0].regionId)
        const path: PathwayDescriptor = {
            transitionIds: transitions.map(transition => transition.id)
        }
        const url = formPath(path)
        return (
            <a
                style={boxStyle}
                onClick={(event) => this.onClick(event)}
                target="_blank"
                href={url}
            >
                <div>
                    <h2 style={countryNameStyle}>
                        {targetRegion && text(targetRegion.name)}
                    </h2>
                    <h1 style={pathNameStyle}>
                        {text(transitions[0].name)}
                    </h1>
                </div>
            </a>
        )
    }

    onClick(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault()
        this.props.onClick()
    }
}

export default PathwayBox
