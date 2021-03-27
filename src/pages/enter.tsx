import { Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { SignInButtons } from '@components/SignInButtons'
import { UsernameForm } from '@components/UsernameForm'
import { useAuth } from '@lib/auth'
import { useRedirect } from '@lib/hooks'
import { NextPage } from 'next'

const EnterPage: NextPage = () => {
  useRedirect()
  const { user, username } = useAuth()

  return (
    <Layout variant='small'>
      <Stack align='center'>
        {user && !username && <UsernameForm />}
        {!user && <SignInButtons />}
      </Stack>
    </Layout>
  )
}

export default EnterPage
