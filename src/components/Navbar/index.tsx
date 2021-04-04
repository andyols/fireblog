import { Button, Heading, HStack } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import React from 'react'
import { ColorModeSwitch } from '../ColorModeSwitch'
import { UserMenu } from './UserMenu'

export const Navbar: React.FC = () => {
  return (
    <HStack
      justify='space-between'
      p={4}
      px={8}
      bg={useColors('paper')}
      shadow='xs'
      as='nav'
    >
      <Link href='/' passHref>
        <Heading
          as={Button}
          variant='unstyled'
          p={0}
          bg='none'
          _hover={{ cursor: 'pointer', transform: 'scale(1.05)', bg: 'none' }}
        >
          🔥
        </Heading>
      </Link>
      <HStack>
        <ColorModeSwitch />
        <UserMenu />
      </HStack>
    </HStack>
  )
}
