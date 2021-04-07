import { HStack, Stack, useBreakpoint } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import React from 'react'

export const AsideWrapper: React.FC = ({ children }) => {
  const breakpoint = useBreakpoint()
  const bg = useColors('paper')
  const borderColor = useColors('border')

  return breakpoint === 'base' || breakpoint === 'sm' ? (
    <HStack
      as='aside'
      textAlign='center'
      bg={bg}
      borderTop='1px'
      borderColor={borderColor}
      bottom={0}
      left={0}
      px={4}
      py={3}
      spacing={0}
      position='fixed'
      w='full'
      justify='flex-end'
    >
      {children}
    </HStack>
  ) : (
    <Stack
      textAlign='center'
      as='aside'
      alignSelf='flex-start'
      position='sticky'
      top={24}
      spacing={0}
    >
      {children}
    </Stack>
  )
}
