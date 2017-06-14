import * as React from 'react'
import PathwaySummaryBox from './PathwaySummaryBox'
import Title from './Title'

import { Pathway } from '../../utils/definitions'
import { text } from '../../utils/text'
import { Credits } from './Credits'
import { LangId } from '../../../definitions/auxiliary/MultiLang'

const pathShowcaseStyle = {
    justifyContent: 'space-around',
    overflow: 'scroll',
    padding: '0 1em 3em',
} as React.CSSProperties

interface PathShowcaseProps {
    paths: Pathway[]
    lang: LangId
    onClick: (event: any) => void
    onFilterTextClick: () => void
}

const PathwayListDisplay = (props: PathShowcaseProps) =>
    <div style={pathShowcaseStyle}>
        <Title
            text={text({
                    en: `Found ${props.paths.length} mobility options for you`,
                    zh_hans: `找到了${props.paths.length}种可能适合你的签证`,
            })}
            filterText={text({
                    en: 'filter',
                    zh_hans: '筛选',
            })}
            onFilterTextClick={props.onFilterTextClick}
        />
        {
            props.paths.map((path: Pathway) =>
                <PathwaySummaryBox
                    path={path}
                    key={path.transitions.map(transition => transition.id).join('')}
                    onClick={
                        () => props.onClick(path)
                    }
                />,
            )
        }
        <Credits lang={props.lang} />
    </div>

export default PathwayListDisplay
