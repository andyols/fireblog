import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const styles = {
  global: () => ({
    html: {
      minW: 'xs',
      scrollBehavior: 'smooth'
    }
  })
}

const theme = extendTheme({ config, styles })

export default theme
