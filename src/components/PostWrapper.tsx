import { Flex } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import React from 'react'
import { WrapperVariant } from './Wrapper'

interface PostWrapperProps {
  variant?: WrapperVariant
}

export const PostWrapper: React.FC<PostWrapperProps> = ({
  children,
  variant
}) => {
  const bg = useColors('paper')
  const borderColor = useColors('border')
  return (
    <Flex
      as='section'
      flexDir='column'
      p={4}
      pr={[6, 8, 12]}
      bg={bg}
      border={[`${variant === 'flushed' ? 'hidden' : '1px'}`, '1px']}
      borderColor={[borderColor, borderColor]}
      borderRadius='base'
      minW={['100%', '100%', '90%']}
    >
      {children}
    </Flex>
  )
}
