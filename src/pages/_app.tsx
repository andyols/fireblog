import { ChakraProvider } from '@chakra-ui/react'
import { MeContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import theme from '@lib/theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()

  return (
    <ChakraProvider theme={theme}>
      <MeContext.Provider value={userData}>
        <Component {...pageProps} />
      </MeContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
