import { Flex, Stack, SystemProps } from '@chakra-ui/react'
import React from 'react'

export type WrapperWidth = 'sm' | 'md' | 'lg'
export type WrapperJustify = SystemProps['justifyContent']
export type WrapperVariant = 'flushed' | 'regular'

interface WrapperProps {
  width?: WrapperWidth
  justify?: WrapperJustify
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  width = 'md',
  justify = 'center',
  variant = 'regular'
}) => {
  return (
    <Flex flex='auto' justify={justify}>
      <Stack
        py={variant === 'regular' ? [4, 8, 12] : [0, 2, 4]}
        px={variant === 'regular' ? [2, 4, 8] : [0, 2, 4]}
        maxW={
          width === 'lg'
            ? 'container.lg'
            : 'md'
            ? 'container.md'
            : 'container.sm'
        }
        w='full'
        as='main'
      >
        {children}
      </Stack>
    </Flex>
  )
}
