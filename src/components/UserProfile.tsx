import { Avatar, Heading, Stack, Text } from '@chakra-ui/react'
import { User } from '@lib/types'
import { useColors } from '@utils/useColors'
import React from 'react'

interface UserProfileProps {
  user: User
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const usernameColor = useColors('blue')

  return (
    <Stack align='center' as='section'>
      <Avatar size='2xl' src={user.photoURL || ''} shadow='md' />
      <Stack spacing={4} textAlign='center'>
        <Text fontSize={['md', 'lg']} fontStyle='italic' color={usernameColor}>
          @{user.username}
        </Text>
        <Heading fontSize={['2xl', '3xl']}>{user.displayName}</Heading>
      </Stack>
    </Stack>
  )
}
