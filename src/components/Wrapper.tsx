import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'

export type WrapperVariant = {
  variant?: 'small' | 'regular'
}

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant = 'regular',
  children
}) => {
  return (
    <Flex flex='auto' overflow='auto' justify='center' as='main'>
      <Stack
        mt={8}
        px={4}
        maxW={variant === 'regular' ? '800px' : '400px'}
        w='full'
      >
        {children}
      </Stack>
    </Flex>
  )
}
