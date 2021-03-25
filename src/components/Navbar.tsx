import { Avatar, Button, Heading, HStack } from '@chakra-ui/react'
import { MeContext } from '@lib/context'
import { auth } from '@lib/firebase'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useContext } from 'react'

export const Navbar: React.FC = () => {
  const { user, username } = useContext(MeContext)
  const router = useRouter()

  return (
    <HStack justify='space-between' p={4} bg='messenger.500'>
      <Link href='/'>
        <Heading _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}>
          🔥
        </Heading>
      </Link>
      <HStack>
        {!user && !router.pathname.includes('enter') && (
          <Link href='/enter'>
            <Button colorScheme='whatsapp'>Login</Button>
          </Link>
        )}
        {user && (
          <>
            {username && (
              <Link href='/admin'>
                <Button colorScheme='whatsapp'>Create a Post</Button>
              </Link>
            )}
            {user && (
              <Button
                variant='ghost'
                color='white'
                _hover={{ bg: 'messenger.600' }}
                onClick={() => auth.signOut()}
              >
                Logout
              </Button>
            )}
            <Link href={`/${username}`}>
              <Avatar src={user.photoURL || ''} />
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  )
}
