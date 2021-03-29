import { Avatar, Heading, Stack, Text } from '@chakra-ui/react'
import { User } from '@lib/types'
import React from 'react'

interface UserProfileProps {
  user: User
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Stack align='center' as='section'>
      <Avatar size='2xl' src={user.photoURL || ''} shadow='md' />
      <Stack spacing={4} textAlign='center'>
        <Text fontSize='lg' fontStyle='italic' color='messenger.500'>
          @{user.username}
        </Text>
        <Heading>{user.displayName}</Heading>
      </Stack>
    </Stack>
  )
}
