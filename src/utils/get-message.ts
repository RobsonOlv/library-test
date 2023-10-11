import { useContext, useEffect, useState } from 'react'
import { LibraryContext } from './context/libraryContext'
import enMessages from '../messages/en.json'
import esMessages from '../messages/es.json'
import ptMessages from '../messages/pt.json'
import { MessagesType } from './typings/messages-types'

export const getMessages = () => {
  const { locale } = useContext(LibraryContext)
  const [messages, setMessages] = useState<MessagesType>(enMessages)

  useEffect(() => {
    if (locale === 'en') {
      setMessages(enMessages)
    } else if (locale === 'es') {
      setMessages(esMessages)
    } else if (locale === 'pt') {
      setMessages(ptMessages)
    } else {
      console.error(`Unsupported locale: ${locale}`)
    }
  }, [locale])

  return messages
}
