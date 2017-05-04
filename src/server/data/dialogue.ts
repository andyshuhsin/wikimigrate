import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {clone} from "../../fe/utils/clone"
import {Person} from "../../definitions/Person"

interface Exchange {
    text: MultiLangStringSet
    getNewPersonDescription(person: Person, answer: string): Person
}

interface Dialogue {
    exchanges: Exchange[]
}

export const wechatDialogue: Dialogue = {
    exchanges: [
        {
            text: {
                zh_hans: "年龄多大了？"
            },
            getNewPersonDescription(person, answer)  {
                const newPerson = clone(person)
                newPerson.birth = {
                    date: {
                        year: new Date().getFullYear() - Number(answer)
                    }
                }
                return newPerson
            }
        }
    ],
}
