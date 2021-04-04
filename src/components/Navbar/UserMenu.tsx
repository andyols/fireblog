import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useBreakpoint
} from '@chakra-ui/react'
import { useAuth } from '@lib/auth'
import { auth } from '@lib/firebase'
import { isUserAnonymous } from '@utils/isUserAnonymous'
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const UserMenu: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'base'

  const handleSignOut = () => {
    return isUserAnonymous() ? auth.currentUser?.delete() : auth.signOut()
  }

  if (!user && router.pathname !== '/enter') {
    return (
      <Link href='/enter'>
        <Button colorScheme='whatsapp'>Login</Button>
      </Link>
    )
  }

  return user ? (
    <>
      {user!.username && !isMobile && (
        <Link href='/admin'>
          <Button colorScheme='whatsapp'>My Posts</Button>
        </Link>
      )}
      <Menu isLazy>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Avatar}
              variant='unstyled'
              boxShadow={isOpen ? '0 0 0 3px rgba(66, 153, 225, 0.6)' : 'none'}
            >
              <Avatar
                as={Button}
                variant='unstyled'
                p={0}
                src={user?.photoURL as string}
              />
            </MenuButton>
            <Portal>
              <MenuList>
                <Link href={`/${user?.username}`}>
                  <MenuItem>
                    <Box>
                      <Text>{user?.displayName} </Text>
                      <Text fontSize='sm' color={useColors('blue')}>
                        @{user?.username}{' '}
                      </Text>
                    </Box>
                  </MenuItem>
                </Link>
                {isMobile && (
                  <>
                    <MenuDivider />
                    <Link href='/admin'>
                      <MenuItem>My Posts</MenuItem>
                    </Link>
                  </>
                )}
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </>
  ) : null
}
