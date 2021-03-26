import { Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { SignInButtons } from '@components/SignInButtons'
import { UsernameForm } from '@components/UsernameForm'
import { UserContext } from '@lib/context'
import { NextPage } from 'next'
import { useContext } from 'react'

const EnterPage: NextPage = () => {
  const { user, username } = useContext(UserContext)

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
