import { Flex } from '@chakra-ui/react'
import React from 'react'
import { SiteBreadcrumb } from './SiteBreadcrumb'
import { Wrapper, WrapperVariant } from './Wrapper'

interface LayoutProps {
  variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <Flex flexDir='column' h='100vh'>
      <Wrapper variant={variant}>{children}</Wrapper>
      <SiteBreadcrumb />
    </Flex>
  )
}
