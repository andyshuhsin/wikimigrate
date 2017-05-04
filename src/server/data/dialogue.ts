import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {clone} from "../../fe/utils/clone"
import {Person} from "../../definitions/Person"

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

export const wechatDialog: Dialogue = {
    exchanges: [
        {
            text: {
                zh_hans: `你好，我是谷麦出海机器人。请回复「开始」开始聊天，我会帮你想想怎么样出去比较好。`
            },
            getNewPersonDescription(person)  {
                return person
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
