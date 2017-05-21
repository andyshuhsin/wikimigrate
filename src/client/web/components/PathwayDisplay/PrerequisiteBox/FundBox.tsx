import * as React from 'react'

import { FundPrereq, FundPrereqCondition } from '../../../../../definitions/Prerequisites/FundPrereq'
import { text } from '../../../../utils/text'
import { LangId } from '../../../../../definitions/auxiliary/MultiLang'
import { data } from '../../../../../data'

function stringifyCondition(condition: Partial<FundPrereqCondition>) {
    if (condition.familyMember) {
        return text({
            en: ` if you have ${condition.familyMember} family members`,
            zh_hans: `${condition.familyMember}人家庭——`,
        })
    }
    else if (condition.source) {
        return (
            <span>
                {
                    text({
                        en: 'from ',
                        zh_hans: '从',
                    })
                }
                <a href={condition.source.reference.url}>
                    {text(condition.source.name)}
                </a>
            </span>
        )
    }
    else {
        console.warn('Unimplemented: FundPreq scheme condition', condition)
        return ''
    }
}

interface SchemeBoxProps {
    currencyCode: string
    fundValue: string
    schemeCondition?: Partial<FundPrereqCondition>
    texts: {
        front: string
    }
    lang: LangId
}

const FundSchemeBox = (props: SchemeBoxProps) => {
    if (props.lang === 'zh_hans') {
        return (
            <div>
                {
                    props.schemeCondition && stringifyCondition(props.schemeCondition)
                }
                {props.texts.front}
                {props.currencyCode}
                {' '}
                {props.fundValue}
                {' '}
            </div>
        )
    }
    else {
        return (
            <div>
                {props.texts.front}
                {props.currencyCode}
                {' '}
                {props.fundValue}
                {' '}
                {
                    props.schemeCondition && stringifyCondition(props.schemeCondition)
                }
            </div>
        )
    }
}

const FundBox = (props: { prereq: FundPrereq, lang: LangId }) => {
    if (props.prereq.type === 'possess') {
        return (
            <div>
                {
                    text({
                        en: 'You have',
                        zh_hans: '资产要求：',
                    })
                }
                {
                    props.prereq.schemes.map((scheme) => {
                        if (scheme.fund) {
                            const currencyCode = data.common.currencies[scheme.fund.currencyId].code
                            const fundValue = scheme.fund.value.toLocaleString(data.app.lang, {
                                style: 'decimal',
                                currency: scheme.fund.currencyId,
                            })
                            return <FundSchemeBox
                                currencyCode={currencyCode}
                                fundValue={fundValue}
                                schemeCondition={scheme.condition}
                                key={JSON.stringify(scheme)}
                                texts={{front: ''}}
                                lang={props.lang}
                            />
                        }
                        else {
                            return <noscript key={Math.random()}/>
                        }
                    })
                }
            </div>
        )
    }
    else if (props.prereq.type === 'investee') {
        return (
            <div>
                {props.prereq.schemes.map(scheme => {
                    if (scheme.fund) {
                        const currencyCode = data.common.currencies[scheme.fund.currencyId].code
                        const fundValue = scheme.fund.value.toLocaleString(data.app.lang, {
                            style: 'decimal',
                            currency: scheme.fund.currencyId,
                        })
                        return <FundSchemeBox
                            currencyCode={currencyCode}
                            fundValue={fundValue}
                            schemeCondition={scheme.condition}
                            key={JSON.stringify(scheme)}
                            texts={{
                                front: text({
                                    en: 'You received ',
                                    zh_hans: '获得投资金额',
                                }),
                            }}
                            lang={props.lang}
                        />
                    }
                    else {
                        return <noscript key={Math.random()}/>
                    }

                })}
            </div>
        )
    }
    else if (props.prereq.type === 'admission') {
        const source = props.prereq.schemes[0].condition.source
        if (props.lang === 'zh_hans') {
            return (
                <div>
                    被
                    <a href={source.reference.url}>
                        {text(source.name)}
                    </a>
                    录取
                </div>
            )
        }
        else {
            return (
                <div>
                    You are admitted by {' '}
                    <a href={source.reference.url}>
                        {text(source.name)}
                    </a>
                </div>
            )

        }
    }
    else {
        console.warn('Unimplemented: cannot handle FundPreq', props.prereq)
        return <noscript />
    }
}

export default FundBox
