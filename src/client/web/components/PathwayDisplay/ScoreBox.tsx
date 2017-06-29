import * as React from 'react'
import { ScoreHistory, ScoreHistoryEntry } from '../../../../definitions/ScoreSystem'
import design from '../../design'
import { text } from '../../../utils/text'

interface PropTypes {
    score: number
    history: ScoreHistory
    name: string
}

const scoreStyle = {
    fontWeight: 'bolder',
} as React.CSSProperties

const commentStyle = {
    fontSize: '0.9em',
    color: design.colors.greyDark,
}

const HistoryEntry = (props: { entry: ScoreHistoryEntry }) => (
    <div>
        <span style={scoreStyle}>
            {props.entry.lowestScore}
        </span>
        {'@'}
        {props.entry.date.join('-')}
    </div>
)

class ScoreBox extends React.PureComponent<PropTypes, {}> {
    render() {
        return (
            <div>
                <div style={{fontSize: '1.2em'}}>
                    {this.props.name}
                </div>
                <div>
                    {
                        text({
                            en: 'Your score: ',
                            zh_hans: '分数： ',
                        })
                    }
                    <span style={scoreStyle}>{this.props.score}</span>
                    <br />
                </div>

                <div>
                    {
                        text({
                            en: 'Previous lowest scores for entry: ',
                            zh_hans: '过往分数线： ',
                        })
                    }
                    {
                        this.props.history.map(entry =>
                            <HistoryEntry
                                key={entry.date.join()}
                                entry={entry}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ScoreBox
