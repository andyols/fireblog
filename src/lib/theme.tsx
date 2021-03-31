import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: () => ({
    html: {
      minW: 'xs',
      scrollBehavior: 'smooth'
    }
  })
}

const theme = extendTheme({ styles })

export default theme
