import { Button, Heading, HStack } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import React from 'react'
import { ColorModeSwitch } from '../ColorModeSwitch'
import { UserMenu } from './UserMenu'

export const Navbar: React.FC = () => {
  const bgColor = useColors('paper')
  const borderColor = useColors('border')

  return (
    <HStack
      as='nav'
      justify='space-between'
      p={4}
      px={8}
      position='fixed'
      w='full'
      bg={bgColor}
      borderBottom='1px'
      borderColor={borderColor}
      zIndex='docked'
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
