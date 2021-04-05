import { Button, Heading, HStack, Text } from '@chakra-ui/react'
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
      px={[2, 4, 8]}
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
          fontSize='4xl'
          fontWeight='bold'
          py={1}
          px={2}
          fontFamily='mono'
        >
          BL<Text fontSize='2xl'>🔥</Text>G
        </Heading>
      </Link>
      <HStack>
        <ColorModeSwitch />
        <UserMenu />
      </HStack>
    </HStack>
  )
}
