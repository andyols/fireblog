import { Avatar, Button, Heading, HStack } from '@chakra-ui/react'
import { useAuth } from '@lib/auth'
import { auth } from '@lib/firebase'
import { isUserAnonymous } from '@utils/isUserAnonymous'
import { useColors } from '@utils/useColors'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import { ColorModeSwitch } from './ColorModeSwitch'

export const Navbar: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    return isUserAnonymous() ? auth.currentUser?.delete() : auth.signOut()
  }

  return (
    <HStack
      justify='space-between'
      p={4}
      bg={useColors('paper')}
      shadow='xs'
      as='nav'
    >
      <Link href='/'>
        <Heading
          as='a'
          _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}
        >
          🔥
        </Heading>
      </Link>
      <HStack>
        <ColorModeSwitch />
        {!user && router.pathname !== '/enter' && (
          <Link href='/enter'>
            <Button colorScheme='whatsapp'>Login</Button>
          </Link>
        )}
        {user && (
          <>
            {user.username && (
              <Link href='/admin'>
                <Button colorScheme='whatsapp'>My Posts</Button>
              </Link>
            )}
            {user && <Button onClick={handleSignOut}>Logout</Button>}
            {user.username && (
              <Link href={`/${user.username}`}>
                <Avatar
                  _hover={{ cursor: 'pointer' }}
                  src={user.photoURL as string}
                />
              </Link>
            )}
          </>
        )}
      </HStack>
    </HStack>
  )
}
