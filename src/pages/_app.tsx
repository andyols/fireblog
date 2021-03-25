import { ChakraProvider } from '@chakra-ui/react'
import { MeContext } from '@lib/context'
import theme from '@lib/theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MeContext.Provider value={{ user: null, username: 'andyols' }}>
        <Component {...pageProps} />
      </MeContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
