import { ChakraProvider } from '@chakra-ui/react'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import theme from '@lib/theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
