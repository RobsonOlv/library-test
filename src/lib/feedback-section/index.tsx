import { Flex, Text, Link } from '@vtex/brand-ui'
import EditIcon from 'components/icons/edit-icon'
import LikeIcon from 'components/icons/like-icon'
import LikeSelectedIcon from 'components/icons/like-selected-icon'
import { useRef, useState } from 'react'
import { setButtonStyle } from './functions'
import FeedbackModal, { ModalProps } from 'components/feedback-modal'

import styles from './styles'
import { getMessages } from 'utils/get-message'

interface DocPath {
  slug?: string
  urlToEdit?: string
  suggestEdits?: boolean
  sendFeedback: (comment: string, liked: boolean) => Promise<void>
}

const FeedbackSection = ({
  slug,
  urlToEdit,
  suggestEdits = true,
  sendFeedback,
}: DocPath) => {
  const messages = getMessages()
  const [feedback, changeFeedback] = useState<boolean | undefined>(undefined)
  const [prevSlug, setPrevSlug] = useState(slug)
  const [modalState, changeModalState] = useState<ModalProps>({
    modalOpen: false,
  })
  const likeButton = useRef<HTMLElement>()
  const dislikeButton = useRef<HTMLElement>()

  if (slug !== prevSlug) {
    setPrevSlug(slug)
    changeModalState({ modalOpen: false })
    changeFeedback(undefined)
  }

  const openModal = (choice: boolean) => {
    changeModalState({
      modalOpen: true,
      liked: choice,
    })
  }

  return (
    <Flex sx={styles.container} data-cy="feedback-section">
      <Text sx={styles.question}>
        {feedback !== undefined
          ? messages['feedback_section.response']
          : messages['feedback_section.question']}
      </Text>
      <Flex sx={styles.likeContainer}>
        <Flex
          ref={likeButton}
          sx={setButtonStyle(feedback, modalState, true)}
          onClick={feedback === undefined ? () => openModal(true) : null}
          data-cy="feedback-section-like"
        >
          {feedback === undefined || !feedback ? (
            <LikeIcon size={24} sx={styles.likeIcon} />
          ) : (
            <LikeSelectedIcon size={24} sx={styles.likeIcon} />
          )}
          <Text>{messages['feedback_section.positive']}</Text>
        </Flex>
        <Flex
          ref={dislikeButton}
          sx={setButtonStyle(feedback, modalState, false)}
          onClick={feedback === undefined ? () => openModal(false) : null}
        >
          {feedback === undefined || feedback ? (
            <LikeIcon size={24} sx={styles.dislikeIcon} />
          ) : (
            <LikeSelectedIcon size={24} sx={styles.dislikeIcon} />
          )}
          <Text>{messages['feedback_section.negative']}</Text>
        </Flex>
      </Flex>
      {suggestEdits && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={urlToEdit}
          sx={styles.editContainer}
        >
          <EditIcon size={24} sx={styles.editIcon} />
          <Text>{messages['feedback_section.edit']}</Text>
        </Link>
      )}
      {modalState.modalOpen ? (
        <FeedbackModal
          changeFeedBack={changeFeedback}
          changeModalState={changeModalState}
          modalState={modalState}
          chosenButtonRef={modalState.liked ? likeButton : dislikeButton}
          onSubmit={(comment) =>
            sendFeedback(comment, modalState.liked ?? false)
          }
        />
      ) : null}
    </Flex>
  )
}

export default FeedbackSection
