import { Box, useBreakpoint } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import React from 'react'

export const AsideWrapper: React.FC = ({ children }) => {
  const breakpoint = useBreakpoint()
  const bg = useColors('paper')
  const borderColor = useColors('border')

  return breakpoint === 'base' || breakpoint === 'sm' ? (
    <Box
      as='aside'
      bg={bg}
      borderTop='1px'
      borderColor={borderColor}
      bottom={0}
      left={0}
      p={4}
      position='fixed'
      w='full'
    >
      {children}
    </Box>
  ) : (
    <Box as='aside' position='sticky' top={0}>
      {children}
    </Box>
  )
}
