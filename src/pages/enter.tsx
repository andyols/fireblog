import { Heading, Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { SignInButtons } from '@components/SignInButtons'
import { UsernameForm } from '@components/UsernameForm'
import { useAuth } from '@lib/auth'
import { useRedirect } from '@lib/hooks'
import { NextPage } from 'next'

const EnterPage: NextPage = () => {
  useRedirect()
  const { user } = useAuth()

  return (
    <Layout variant='small'>
      <PageHead pageTitle='Sign In' />
      {user && !user.username && <UsernameForm />}
      {!user && (
        <>
          <Heading placeSelf='center' fontSize='3xl'>
            👋 Welcome to Fireblog!
          </Heading>
          <Stack
            align='center'
            bg='white'
            p={4}
            borderRadius='base'
            shadow='base'
          >
            <SignInButtons />
          </Stack>
        </>
      )}
    </Layout>
  )
}

export default EnterPage
