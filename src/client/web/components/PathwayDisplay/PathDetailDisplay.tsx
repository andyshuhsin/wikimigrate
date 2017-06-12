import * as React from 'react'
import TransitionDisplay from './TransitionDisplay'

import { Pathway } from '../../../utils/definitions'
import { Person } from '../../../../definitions/Person'
import { LangId } from '../../../../definitions/auxiliary/MultiLang'

const style = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    padding: '0.5em',
    overflow: 'scroll',

    background: '#ebebeb',
    zIndex: 1,
} as React.CSSProperties

const sideLength = '1em'
const closeButtonStyle = (() => {
    return {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: '20px',
        margin: 'auto',

        height: sideLength,
        width: sideLength,
        lineHeight: sideLength,
        borderRadius: '50%',

        background: 'rgba(0, 0, 0, 0.2)',
        color: 'white',

        fontSize: '3em',
        textAlign: 'center',

        cursor: 'pointer',
    } as React.CSSProperties
})()

const crossStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: `calc(${sideLength} / 2)`,
} as React.CSSProperties

interface Props {
    user: Person
    pathOnDisplay: Pathway | null
    onClose: (event: any) => void
    lang: LangId
}

class PathwayDisplay extends React.PureComponent<Props, {}> {

    render() {
        if (this.props.pathOnDisplay) {
            return (
                <article style={style}>

                    {
                        this.props.pathOnDisplay.transitions.map(
                            transition =>
                                <TransitionDisplay
                                    user={this.props.user}
                                    transition={transition}
                                    key={transition.id}
                                    lang={this.props.lang}
                                />,
                        )
                    }

                    <div style={closeButtonStyle}
                         onClick={this.props.onClose}>
                        <img
                            style={crossStyle}
                            src={require('../../../assets/cross.svg')}
                        />
                    </div>

                </article>
            )
        }
        else {
            return null
        }
    }

}

export default PathwayDisplay
