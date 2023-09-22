import {
  Header as HeaderBrand,
  Link as VtexLink,
  Flex,
  Text,
  Box,
  IconProps,
} from '@vtex/brand-ui'
import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import DropdownMenu from 'components/dropdown-menu'
import GridIcon from 'components/icons/grid-icon'
import LongArrowIcon from 'components/icons/long-arrow-icon'

import { getFeedbackURL } from 'utils/get-url'

import AnnouncementBar from 'components/announcement-bar'

import styles from './styles'
import { LibraryContext } from 'utils/context/libraryContext'
import HamburgerMenu from 'lib/hamburger-menu'
import { Section } from 'utils/types'

interface Props {
  isEditor: boolean
  Icon: (props: IconProps) => JSX.Element
  editorSections: Section[][]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = ({ isEditor, Icon, editorSections }: Props) => {
  const router = useRouter()
  const isBranchPreview = router.isPreview

  const { branchPreview, sidebarSections } = useContext(LibraryContext)

  const lastScroll = useRef(0)
  const modalOpen = useRef(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const headerElement = useRef<HTMLElement>()

  useEffect(() => {
    const body = document.body

    const observer = new MutationObserver(() => {
      modalOpen.current = !modalOpen.current
      if (headerElement.current) {
        if (modalOpen.current) {
          const headerHeight = headerElement.current.children[0].clientHeight
          headerElement.current.style.top = `-${headerHeight}px`
        } else {
          headerElement.current.style.top = '0'
        }
      }
    })
    observer.observe(body, {
      attributeFilter: ['style'],
    })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowDropdown(false)
      if (headerElement.current && !modalOpen.current) {
        const headerHeight = headerElement.current.children[0].clientHeight
        if (
          window.scrollY > headerHeight &&
          window.scrollY > lastScroll.current
        ) {
          headerElement.current.style.top = `-${headerHeight}px`
        } else {
          headerElement.current.style.top = '0'
        }
        lastScroll.current = window.scrollY
      }
    }

    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [headerElement.current])

  useEffect(() => {
    const hideDropdown = () => {
      setShowDropdown(false)
    }

    router.events.on('routeChangeStart', hideDropdown)
    return () => router.events.off('routeChangeStart', hideDropdown)
  }, [])

  return (
    <Box ref={headerElement} sx={styles.headerContainer}>
      {!isBranchPreview ? (
        <div></div>
      ) : (
        // To create an announcement at the topbar, un-comment this code, and change the copy and links.
        // <AnnouncementBar
        //   closable={true}
        //   type="new"
        //   label="📢 We want to know more about you and how you use our docs. "
        //   action={{
        //     button: 'Fill in our survey! It takes less than 5 minutes.',
        //     href: 'https://forms.gle/5EvnahjuwQqwumDd9',
        //   }}
        // ></AnnouncementBar>
        <AnnouncementBar
          closable={false}
          type="warning"
          label={`🚧 You are currently using branch ${branchPreview} in preview mode. This content may differ from the published version.`}
          action={{
            button: 'EXIT PREVIEW MODE',
            href: '/api/disable-preview',
          }}
        ></AnnouncementBar>
      )}
      <HeaderBrand sx={styles.headerBrand}>
        <VtexLink
          aria-label="Go back to Home"
          href="/"
          sx={styles.headerBrandLink}
        >
          <Icon sx={styles.logoSize} />
        </VtexLink>

        {/* <Box sx={styles.searchContainer}>
          <SearchInput />
        </Box> */}

        <HeaderBrand.RightLinks sx={styles.rightLinks}>
          <Flex
            sx={styles.dropdownContainer}
            onMouseOver={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Flex sx={styles.dropdownButton(showDropdown)}>
              <GridIcon />
              {!isEditor ? (
                <Text sx={styles.rightButtonsText} data-cy="docs-dropdown">
                  Documentation
                </Text>
              ) : (
                <Text sx={styles.rightButtonsText} data-cy="docs-dropdown">
                  Admin tools
                </Text>
              )}
            </Flex>

            {showDropdown && <DropdownMenu isEditor={isEditor} sections={sidebarSections} editorSections={editorSections}/>}
          </Flex>

          <VtexLink
            sx={styles.rightLinksItem}
            href={getFeedbackURL()}
            target="_blank"
          >
            <LongArrowIcon />
            <Text sx={styles.rightButtonsText}>
              Feedback
            </Text>
          </VtexLink>
        </HeaderBrand.RightLinks>
        <HamburgerMenu />
      </HeaderBrand>
    </Box>
  )
}

export default Header
