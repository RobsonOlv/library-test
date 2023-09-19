import type { SxStyleProp } from '@vtex/brand-ui'

const menuContainer: SxStyleProp = {
  display: 'flex',
  width: 'max-content',
}

const cardContainer: SxStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
}

const sideMenuContainer: SxStyleProp = {
  backgroundColor: '#ffff',
  height: 'calc(100vh - 5rem)',
  width: '100vw',
  overflowY: 'auto',
  overflowX: 'hidden',
  transform: 'translate(0)',
  transition: 'transform .5s cubic-bezier(.4,0,.2,1)',
}

const hamburgerContainer: SxStyleProp = {
  backgroundColor: '#ffff',
  width: '100%',
  '.menuHidden': {
    transform: 'translate(-100%)',
  },
}

// eslint-disable-next-line prettier/prettier

const hamburgerSearchContainer: SxStyleProp = {
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: '18px',
  height: 'auto',
}

const documentationContainer: SxStyleProp = {
  px: '16px',
  paddingBottom: '8px',
}

const sectionDivider: SxStyleProp = {
  px: '16px',
  hr: {
    border: '1px solid #E7E9EE',
    borderTop: 'none',
    mb: '32px',
  },
}

const innerHambugerContainer: SxStyleProp = {
  padding: '0px',
  position: 'relative',
  overflowX: 'hidden',
}

const innerCardContainer: SxStyleProp = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const arrowIcon: SxStyleProp = {
  padding: '0',
  height: '50px',
  width: '50px',
  color: 'muted.1',
}

const arrowIconActive: SxStyleProp = {
  ...arrowIcon,
  color: '#D71D55',
}

export default {
  menuContainer,
  cardContainer,
  sideMenuContainer,
  hamburgerSearchContainer,
  documentationContainer,
  sectionDivider,
  hamburgerContainer,
  innerHambugerContainer,
  innerCardContainer,
  arrowIcon,
  arrowIconActive,
}
