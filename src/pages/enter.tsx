import { Heading, Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { SignInButtons } from '@components/SignInButtons'
import { UsernameForm } from '@components/UsernameForm'
import { useAuth } from '@lib/auth'
import { useRedirect } from '@lib/hooks'
import { NextPage } from 'next'

const EnterPage: NextPage = () => {
  useRedirect()
  const { user } = useAuth()

  return (
    <Layout width='sm' title='Sign In'>
      {user && !user.username && <UsernameForm />}
      {!user && (
        <>
          <Heading textAlign='center' fontSize={['2xl', '3xl', '4xl']}>
            👋 Welcome to Fireblog!
          </Heading>
          <Stack pt={4} align='center'>
            <SignInButtons />
          </Stack>
        </>
      )}
    </Layout>
  )
}

export default EnterPage
