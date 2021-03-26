import { Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { SignInButtons } from '@components/SignInButtons'
import { UsernameForm } from '@components/UsernameForm'
import { useMeContext } from '@lib/context'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

const Enter: NextPage = () => {
  const { user, username } = useMeContext()
  const router = useRouter()

  useEffect(() => {
    if (user && username) {
      router.replace('/')
    }
  }, [user, username])

  return (
    <Layout variant='small'>
      <Stack align='center'>
        {user && !username && <UsernameForm />}
        {!user && <SignInButtons />}
      </Stack>
    </Layout>
  )
}

export default Enter
