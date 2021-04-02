import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from '@chakra-ui/react'
import theme from '@lib/theme'
import { NextPageContext } from 'next'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'
import React, { ReactElement } from 'react'

interface ChakraWrapperProps {
  cookies: NextApiRequestCookies
  children: ReactElement<any, any> | null
}

export const ChakraWrapper: React.FC<ChakraWrapperProps> = ({
  cookies,
  children
}) => {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager() : localStorageManager
  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export const getServerSideProps = ({ req }: NextPageContext) => {
  return {
    props: {
      cookies: req?.headers.cookie ?? ''
    }
  }
}
