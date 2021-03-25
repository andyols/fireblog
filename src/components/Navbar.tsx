import { Avatar, Button, HStack } from '@chakra-ui/react'
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
        <Button>Home</Button>
      </Link>
      {user && (
        <HStack>
          <Link href='/admin'>
            <Button>Create a Post</Button>
          </Link>
          <Link href={`/${username}`}>
            <Avatar src={user.photoURL || ''} />
          </Link>
        </HStack>
      )}
      {!user && !router.pathname.includes('enter') && (
        <Link href='/enter'>
          <Button>Login</Button>
        </Link>
      )}
      {user && <Button onClick={() => auth.signOut()}>Logout</Button>}
    </HStack>
  )
}
