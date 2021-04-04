import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible'

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
