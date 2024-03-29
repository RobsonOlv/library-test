import React from 'react'
import CopyButton from 'components/copy-button'
import { Box, Text } from '@vtex/brand-ui'
import { childrenToString } from 'utils/string-utils'
import styles from './styles'

type Component = {
  node: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function exception5() {
  const a = Math.random()
  if(a > 0.5) {
      throw ({ 'value': 'Error' })
  }
}

const CodeBlock = ({ ...props }: Component) => {
  return (
    <Box sx={styles.CodeBlock}>
      <pre>
        <CopyButton code={childrenToString(props.children)} />
        <Text sx={styles.CodeContent} {...props} />
      </pre>
    </Box>
  )
}

export default CodeBlock
