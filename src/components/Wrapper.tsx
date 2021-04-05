import { Flex, Stack, SystemProps } from '@chakra-ui/react'
import React from 'react'

export type WrapperWidth = 'sm' | 'md' | 'lg'
export type WrapperJustify = SystemProps['justifyContent']
export type WrapperVariant = 'flushed' | 'regular' | 'relaxed'

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
  const NavbarHeight = '73px'

  return (
    <Flex flex='auto' justify={justify} mt={NavbarHeight}>
      <Stack
        py={
          variant === 'relaxed'
            ? [8, 16, 20]
            : variant === 'regular'
            ? [4, 8, 12]
            : [0, 4, 6]
        }
        px={
          variant === 'regular' || variant === 'relaxed' ? [2, 4, 8] : [0, 2, 4]
        }
        maxW={
          width === 'lg'
            ? 'container.lg'
            : 'md'
            ? 'container.md'
            : 'container.sm'
        }
        w='full'
        h='full'
      >
        {children}
      </Stack>
    </Flex>
  )
}
