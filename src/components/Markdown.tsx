import { Box, Code, Stack } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import ChakraUIRenderer, { defaults } from 'chakra-ui-markdown-renderer'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const getCoreProps = (props: any) => {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {}
}

const markdownTheme = {
  ...defaults,
  code: (props: any) => {
    const { language, value } = props
    const className = language && `language-${language}`
    const borderColor = useColors('border')
    const bgColor = useColors('background')

    return (
      <pre {...getCoreProps(props)}>
        <Box overflowX='auto'>
          <Code
            py={4}
            pl={6}
            pr={16}
            className={className || undefined}
            border='1px solid'
            borderColor={borderColor}
            borderRadius='md'
            bg={bgColor}
          >
            {value}
          </Code>
        </Box>
      </pre>
    )
  }
}

interface MarkdownProps {
  markdown: string
}

export const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
  return (
    <Stack as='article'>
      <ReactMarkdown
        children={markdown}
        renderers={ChakraUIRenderer(markdownTheme)}
      />
    </Stack>
  )
}
