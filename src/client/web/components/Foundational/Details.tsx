import * as React from 'react'

// Similar to HTML5 `details` and `summary` Tag

interface DetailsProps {
    summary: string
}

interface DetailsState {
    isExpanded: boolean
}

const style: React.CSSProperties = {
    overflow: 'hidden'
}

const titleStyle: React.CSSProperties = {
    margin: '1em 0',
    cursor: 'pointer',
}

const triangleStyle: React.CSSProperties = {
    transition: 'transform 0.5s',
    display: 'inline-block',
    marginRight: '0.3em',
}

const Triangle = (props: {shouldRotate: boolean}) => (
    <span style={props.shouldRotate
        ? {
            ...triangleStyle,
            transform: 'rotate(90deg)',
        }
        : triangleStyle}
    >
        &#9654;
    </span>

)

export class Details extends React.Component<DetailsProps, DetailsState> {

    constructor(props: DetailsProps) {
        super(props)
        this.state = {
            isExpanded: false
        }
    }

    render() {
        return (
            <section style={style}>

                <h5 style={titleStyle}
                    onClick={() => {
                        this.setState({
                            isExpanded: !this.state.isExpanded
                        })
                    }}
                >
                    <Triangle shouldRotate={this.state.isExpanded} />
                    {this.props.summary}
                </h5>

                <div
                    style={this.state.isExpanded
                        ? { height: 'auto' }
                        : { height: 0 }
                    }
                >
                    {this.props.children}
                </div>
            </section>
        )
    }
}
