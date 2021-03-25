import { Button, Input, Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { useMeContext } from '@lib/context'
import { auth, googleAuthProvider } from '@lib/firebase'
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
        {!user && <SignInButton />}
      </Stack>
    </Layout>
  )
}

const SignInButton = () => {
  const handleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (e) {
      console.error(e.message)
    }
  }
  return <Button onClick={handleSignIn}>Sign In With Google</Button>
}
const UsernameForm = () => <Input />

export default Enter
