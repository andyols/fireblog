import { IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export const ColorModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label='Toggle color mode'
      icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
      variant='ghost'
      fontSize='xl'
    />
  )
}
