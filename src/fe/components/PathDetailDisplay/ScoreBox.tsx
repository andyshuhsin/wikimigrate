import * as React from "react"
import {ScoreHistory, ScoreHistoryEntry} from "../../../definitions/ScoreSystem"
import design from "../../design"

interface PropTypes {
    score: number
    history: ScoreHistory
    name: string
}

const scoreStyle = {
    fontWeight: "bolder",
} as React.CSSProperties

const commentStyle = {
    fontSize: "0.9em",
    color: design.colors.greyDark,
}

const HistoryEntry = (props: {entry: ScoreHistoryEntry}) => (
    <div>
        <span style={scoreStyle}>
            {props.entry.lowestScore}
        </span>
        {"@"}
        {props.entry.date.join("-")}
    </div>
)

class ScoreBox extends React.PureComponent<PropTypes, {}> {
    render() {
        return (
            <div>
                <div style={{fontSize: "1.2em"}}>
                    {this.props.name}
                </div>
                <div>
                    Your score:
                    <span style={scoreStyle}>{this.props.score}</span>
                    <br />
                    <span style={commentStyle}>
                        For a more precise score, please describe your self in filter panel.
                    </span>
                </div>

                <div>
                    Previous lowest score for entry:
                    {
                        this.props.history.map(
                            entry =>
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
