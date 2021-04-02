import { useColorModeValue } from '@chakra-ui/react'

interface ColorMode {
  light: string
  dark: string
}

type Color =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'black'
  | 'gray'
  | 'paper'
  | 'background'
  | 'border'

const colors: Record<Color, ColorMode> = {
  red: {
    light: 'red.500',
    dark: 'red.300'
  },
  green: {
    light: 'whatsapp.500',
    dark: 'whatsapp.200'
  },
  blue: {
    light: 'messenger.500',
    dark: 'messenger.300'
  },
  yellow: {
    light: 'yellow.500',
    dark: 'yellow.300'
  },
  black: {
    light: 'gray.900',
    dark: 'gray.800'
  },
  gray: {
    light: 'gray.500',
    dark: 'gray.600'
  },
  paper: {
    light: 'white',
    dark: 'gray.800'
  },
  background: {
    light: 'gray.50',
    dark: 'gray.900'
  },
  border: {
    light: 'gray.200',
    dark: 'gray.700'
  }
}

/**
 * @desc Helper fn to evaluate theme colors based on color mode value
 * @param color the color to evaluate
 */
export const useColors = (color: Color) => {
  return useColorModeValue(colors[color].light, colors[color].dark)
}
