import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular'
}) => {
  return (
    <Flex flex='auto' justify='center'>
      <Stack
        mt={8}
        px={4}
        maxW={variant === 'regular' ? '800px' : '400px'}
        w='full'
        as='main'
      >
        {children}
      </Stack>
    </Flex>
  )
}
