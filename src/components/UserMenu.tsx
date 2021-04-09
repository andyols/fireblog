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
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const UserMenu: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const breakpoint = useBreakpoint()
  const usernameColor = useColors('blue')
  const isMobile = breakpoint === 'base'
  const avatarOutline = '0 0 0 3px rgba(66, 153, 225, 0.6)'

  const handleSignOut = () => auth.signOut()

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
              boxShadow={isOpen ? avatarOutline : 'none'}
              transition='ease-in-out 0.15s'
              _hover={{ cursor: 'pointer', boxShadow: avatarOutline }}
            >
              <Avatar
                as={Button}
                variant='unstyled'
                p={0}
                src={user?.photoURL as string}
              />
            </MenuButton>
            <Portal>
              <MenuList zIndex='overlay'>
                {user.username && (
                  <>
                    <Link href={`/${user?.username}`}>
                      <MenuItem>
                        <Box>
                          <Text>{user?.displayName} </Text>
                          <Text fontSize='sm' color={usernameColor}>
                            @{user?.username}{' '}
                          </Text>
                        </Box>
                      </MenuItem>
                    </Link>

                    <MenuDivider />
                    <Link href={`/admin/settings`}>
                      <MenuItem>My Account</MenuItem>
                    </Link>
                    <Link href='/admin'>
                      <MenuItem>My Posts</MenuItem>
                    </Link>
                    <MenuDivider />
                  </>
                )}
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </>
  ) : null
}
