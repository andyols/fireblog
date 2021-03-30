import { Box, Code, Flex } from '@chakra-ui/react'
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
    return (
      <pre {...getCoreProps(props)}>
        <Box overflowX='auto'>
          <Code
            py={4}
            pl={6}
            pr={16}
            className={className || undefined}
            borderRadius='md'
            shadow='inner'
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
    <Flex
      flexDir='column'
      p={4}
      bg='white'
      shadow='base'
      maxW='100%'
      borderRadius='base'
      as='article'
    >
      <ReactMarkdown
        children={markdown}
        renderers={ChakraUIRenderer(markdownTheme)}
      />
    </Flex>
  )
}
