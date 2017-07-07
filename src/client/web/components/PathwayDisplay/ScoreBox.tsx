import * as React from 'react'
import { onlyInParentGroup, ScoreHistory, ScoreHistoryEntry } from '../../../../definitions/ScoreSystem'
import { text } from '../../../utils/text'
import { BatchScores, ScoreDetails } from '../../../../calculators/calcScore'
import { MultiLangStringSet } from '../../../../definitions/auxiliary/MultiLang'

interface PropTypes {
    scoreDetails: ScoreDetails
    history: ScoreHistory
    name: string
}

const scoreStyle = {
    fontWeight: 'bolder',
} as React.CSSProperties

const LabelTexts: {[key: string]: MultiLangStringSet} = {
    education: {
        en: 'Level of education',
        zh_hans: '学历',
    },
    language: {
        en: 'Official languages proficiency',
        zh_hans: '官方语言能力',
    },
    age: {
        en: 'Age',
        zh_hans: '年龄',
    },
    canadaWork: {
        en: 'Canada work experience',
        zh_hans: '加拿大工作经验',
    },
    transferable: {
        en: 'Skill Transferability factors'
    },
    additions: {
        en: 'Additional',
        zh_hans: '额外加分',
    },
    'language-primary:listening': {
        en: 'Primary language: Listening',
        zh_hans: '第一语言：听力',
    },
    'language-primary:writing': {
        en: 'Primary language: Writing',
        zh_hans: '第一语言：写作',
    },
    'language-primary:speaking': {
        en: 'Primary language: Speaking',
        zh_hans: '第一语言：口语',
    },
    'language-primary:reading': {
        en: 'Primary language: Reading',
        zh_hans: '第一语言：阅读',
    },
    'language-secondary:listening': {
        en: 'Secondary language: Listening',
        zh_hans: '第二语言：听力',
    },
    'language-secondary:writing': {
        en: 'Secondary language: Writing',
        zh_hans: '第二语言：写作',
    },
    'language-secondary:speaking': {
        en: 'Secondary language: Speaking',
        zh_hans: '第二语言：口语',
    },
    'language-secondary:reading': {
        en: 'Secondary language: Reading',
        zh_hans: '第二语言：阅读',
    },
    union: {
        en: 'Union status',
        zh_hans: '婚姻状况',
    },
    'spouse-bonus': {
        en: 'Spouse bonus',
        zh_hans: '配偶加分',
    },
    'transferability:language+education': {
        en: 'Language + Education',
    },
    'transferability:canada_work+education': {
        en: 'Canada work experience + Education'
    },
    'transferability:work+education': {
        en: 'Work experience + Education'
    },
    'transferability:foreign_work+canada_work': {
        en: 'Foreign work experience + Canada work experience'
    },
    'transferability:language+certification': {
        en: 'Language + Trade certification'
    },
    'additional:sibling': {
        en: 'Sibling'
    },
    'additional:french': {
        en: 'French'
    },
    'additional:canada-education': {
        en: 'Canadian education'
    },
    'additional:job-offer': {
        en: 'Job offer'
    },
    'additional:provincial-nomination': {
        en: 'Provincial or territorial nomination'
    }
}

const Row = (props: { text: string, score: number, level: number }) => (
    <tr>
        <td style={{
            paddingLeft: `${props.level * 1}em`,
            fontWeight: props.level === 0 ? 'bold' : 'normal',
        }}>
            {props.text}
        </td>
        <td style={{
            textAlign: 'right',
        }}>
            {props.score}
        </td>
    </tr>
)

const HistoryEntry = (props: { entry: ScoreHistoryEntry }) => (
    <div>
        <span style={scoreStyle}>
            {props.entry.lowestScore}
        </span>
        {'@'}
        {[
            props.entry.date.year,
            props.entry.date.month,
            props.entry.date.day,
        ].join('-')}
    </div>
)

class ScoreBox extends React.PureComponent<PropTypes, {}> {
    render() {
        const scoreDetails = this.props.scoreDetails
        return (
            <div>
                <div style={{fontSize: '1.2em'}}>
                    {this.props.name}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                {
                                    text({
                                        en: 'Your score',
                                        zh_hans: '分数',
                                    })
                                }
                            </th>
                            <th style={scoreStyle}>
                                {scoreDetails.score}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(scoreDetails.groups).map(group => {
                            const conditionGroup = scoreDetails.groups[group]

                            let batchesForDisplay: BatchScores
                            if (Object.keys(conditionGroup.batches).length === 1
                                && Object.keys(conditionGroup.batches)[0] === onlyInParentGroup
                            ) {
                                batchesForDisplay = {}
                            }
                            else {
                                batchesForDisplay = conditionGroup.batches
                            }

                            return [
                                <Row
                                    key={group}
                                    text={text(LabelTexts[group])}
                                    score={conditionGroup.score}
                                    level={0}
                                />,
                                Object.keys(batchesForDisplay).sort().map(batch =>
                                    <Row
                                        key={batch}
                                        text={text(LabelTexts[batch])}
                                        score={conditionGroup.batches[batch]}
                                        level={1}
                                    />
                                )
                            ]
                        }
                    )
                    }
                    </tbody>
                </table>

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
                                key={[entry.date.year, entry.date.month, entry.date.day].join('-')}
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
