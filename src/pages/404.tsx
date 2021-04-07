import {
  Button,
  Heading,
  Icon,
  keyframes,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { useColors } from '@utils/useColors'
import { NextPage } from 'next'
import Link from 'next/link'
import { FaGhost } from 'react-icons/fa'
import { TiChevronLeft } from 'react-icons/ti'

const spooky = keyframes`
  from { transform: translatey(.06em) scaley(.95); }
  to { transform: translatey(-.19em); }
`

const Custom404: NextPage = () => {
  const ghostColor = useColors('blue')
  const subtleText = useColors('gray')
  const linkColor = useColors('blue')

  return (
    <Layout title='Error 404'>
      <Stack textAlign='center' align='center'>
        <Heading
          alignSelf='center'
          pb={4}
          fontSize={['7.5rem', '12.5rem']}
          textShadow='.04em .04em 0 rgba(0,0,0,.33)'
        >
          4
          <Icon
            as={FaGhost}
            animation={`${spooky} 2s alternate infinite linear`}
            color={ghostColor}
            filter='drop-shadow(.04em .04em 0 rgba(0,0,0,.33))'
          />
          4
        </Heading>
        <Text fontWeight='bold' fontSize='2xl' pb={4}>
          This isn't the page you're looking for...
        </Text>
        <Link href='/'>
          <Button as='a' size='lg' leftIcon={<TiChevronLeft />}>
            Go Home
          </Button>
        </Link>
      </Stack>
      <Text
        color={subtleText}
        fontSize='xs'
        pos='absolute'
        bottom={2}
        right={4}
      >
        thanks{' '}
        <ChakraLink
          color={linkColor}
          href='https://codepen.io/Jake_Woods'
          isExternal
        >
          @jake
        </ChakraLink>{' '}
        from codepen
      </Text>
    </Layout>
  )
}

export default Custom404
