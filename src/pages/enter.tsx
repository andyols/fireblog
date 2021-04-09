import { Heading } from '@chakra-ui/react'
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
    <Layout width='sm' title='Sign In' variant='relaxed'>
      {user && !user.username && <UsernameForm />}
      {!user && (
        <>
          <Heading textAlign='center' fontSize={['2xl', '3xl', '4xl']}>
            👋 Welcome to Fireblog!
          </Heading>
          <SignInButtons />
        </>
      )}
    </Layout>
  )
}

export default EnterPage
