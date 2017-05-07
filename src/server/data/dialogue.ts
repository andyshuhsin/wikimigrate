import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {clone} from "../../fe/utils/clone"
import {Person} from "../../definitions/Person"
import {
    buildReverseStageTable,
    EducationQuality, EducationStage, educationStageProfiles,
    EducationStageProfiles,
} from "../../definitions/Qualities/EducationExperience"
import {text} from "../../fe/utils/text"
import {data} from "../../data/index"
import {RegionId} from "../../definitions/auxillary/Region"
import {reverse} from "dns"

interface Exchange {
    text: MultiLangStringSet
    getNewPersonDescription(person: Person, answer: string): Person
}

interface Dialogue {
    exchanges: Exchange[]
    terminalExchange: Exchange
}

const restartKeywords = ["重来", "reset"]

export function shouldReset(answer: string): boolean {
    return restartKeywords.includes(answer.toLowerCase())
}

const wrap = (markStart: string, markEnd: string) => (content: string) => markStart + content + markEnd

const reverseEducationStageNameTable = buildReverseStageTable("zh_hans")
export const wechatDialog: Dialogue = {
    exchanges: [
        {
            text: {
                zh_hans: `你好，我是谷麦出海机器人。请回复「开始」开始聊天，我会帮你想想怎么样出去比较好。`
            },
            getNewPersonDescription(person)  {
                return person
            }
        },
        {
            text: {
                zh_hans: `您最高学历是什么？（本科？硕士？）`
            },
            getNewPersonDescription(person, answer)  {
                const newPerson = clone(person)
                newPerson.education = [{
                    qualityId: "education",
                    stage: reverseEducationStageNameTable[answer]
                } as EducationQuality]
                return newPerson
            }
        },
        {
            text: {
                zh_hans: `在哪个国家或地区读的？`
            },
            getNewPersonDescription(person, answer)  {
                const newPerson = clone(person)
                console.info('region answer', answer)
                const region = data.regions.find(
                    (region => text(region.name, "zh_hans") === answer)
                )

                let regionId: RegionId
                if (!region) {
                    regionId = "world"
                }
                else {
                    regionId = region.id
                }

                if (newPerson.education) {
                    newPerson.education[0].regionId = regionId
                }
                else {
                    console.warn("Unexpected answer: ", answer)
                }
                return newPerson
            }
        }
    ],
    terminalExchange: {
        text: {
            zh_hans: `想要重新开始吗？请输入${restartKeywords.map(wrap("「", "」")).join("或")}`
        },
        getNewPersonDescription(person)  {
            return person
        }
    }
}
