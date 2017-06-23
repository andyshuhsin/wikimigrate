import * as React from 'react'
import text from '../../../utils/text'

import CombinationBox from './CombinationBox'
import ReferenceBox from './ReferenceBox'
import ScoreBox from './ScoreBox'
import PaperworkBox from './PaperworkBox'

import Transition from '../../../../definitions/Transition'
import { RegionId } from '../../../../definitions/auxiliary/Region'
import { calcScore } from '../../../../calculators/calcScore'
import { Person } from '../../../../definitions/Person'
import { LangId } from '../../../../definitions/auxiliary/MultiLang'

const transitionNameStyle = {
    margin: 0,
}

const sectionTitleStyle: React.CSSProperties = {
    margin: '0.5em 0',

    paddingBottom: '0.2em',
    borderBottom: "1px solid",

    fontWeight: 'lighter',
    fontSize: '1.4em',
}

const flagStyle = {
    marginLeft: '0.3em',
    maxWidth: '1.2em',
} as React.CSSProperties

type Package = any

// Should flags live in /data dir?
const flagSources: {[key in RegionId]: Package | null} = {
    canada: require('../../../assets/flags/canada.svg'),
    australia: require('../../../assets/flags/australia.svg'),
    new_zealand: require('../../../assets/flags/new_zealand.svg'),
    world: null,
    canada_atlantic_provinces: null,
    usa: null,
    ireland: null,
    uk: null,
}

interface Props {
    transition: Transition
    user: Person
    lang: LangId,
}

class TransitionDisplay extends React.PureComponent<Props, {}> {
    render() {
        const transition = this.props.transition
        const lang = this.props.lang
        return (
            <div>
                <h1 style={transitionNameStyle}>
                    {text(transition.name)}
                    <img
                        style={flagStyle}
                        src={flagSources[transition.regionId]}
                    />
                </h1>
                {/*<h2 style={h2Style}>
                 To {transition.to.name["en"]},
                 for rights of {transition.to.rights}
                 </h2>*/}

                <section>
                    <h3 style={sectionTitleStyle} id='prerequisites'>
                        {
                            text({
                                en: 'Prerequisites',
                                zh_hans: '申请条件',
                            })
                        }
                    </h3>
                    {
                        <CombinationBox
                            combo={transition.prerequisiteList}
                            level={0}
                            lang={lang}
                        />
                    }
                </section>

                {
                    transition.scoreSystem &&
                    <section>
                        <h3 style={sectionTitleStyle} id='scoring'>
                            {
                                text({
                                    en: 'Scoring',
                                    zh_hans: '分数',
                                })
                            }
                        </h3>
                        <ScoreBox
                            score={calcScore(this.props.user, transition.scoreSystem)}
                            history={transition.scoreSystem.history}
                            name={text(transition.scoreSystem.name)}
                        />
                    </section>
                }

                 <section>
                     <h3 style={sectionTitleStyle} id='application'>
                         {text({
                             en: 'Application',
                             zh_hans: '申请方法',
                         })}
                     </h3>
                     {
                         <PaperworkBox paperwork={transition.paperwork} />
                     }
                 </section>

                {
                    transition.referenceList &&
                    <section>
                        <h3 style={sectionTitleStyle} id='references'>
                            {text({
                                en: 'References',
                                zh_hans: '参考资料',
                            })}
                        </h3>
                        {
                            <ReferenceBox referenceList={transition.referenceList}/>
                        }
                    </section>
                }
            </div>
        )
    }
}

export default TransitionDisplay

