import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Navbar } from './Navbar'
import { Wrapper, WrapperVariant } from './Wrapper'

interface LayoutProps {
  variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <Flex flexDir='column' minH='100vh' bg='gray.50' pb={16}>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </Flex>
  )
}
