import { ChakraWrapper } from '@components/ChakraWrapper'
import { AuthProvider } from '@lib/auth'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraWrapper cookies={pageProps.cookies}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraWrapper>
  )
}

export default MyApp
