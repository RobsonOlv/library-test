import enMessages from '../messages/en.json'
import esMessages from '../messages/es.json'
import ptMessages from '../messages/pt.json'
import { MessagesType } from './typings/messages-types'

const getMessages = (): {
  en: MessagesType
  es: MessagesType
  pt: MessagesType
} => {
  const messages = {
    en: enMessages,
    es: esMessages,
    pt: ptMessages,
  }

  return messages
}

export const messages = getMessages()
