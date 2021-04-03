import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const styles = {
  global: () => ({
    '.js-focus-visible :focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none'
    },
    html: {
      minW: 'xs',
      scrollBehavior: 'smooth'
    }
  })
}

const theme = extendTheme({ config, styles })

export default theme
