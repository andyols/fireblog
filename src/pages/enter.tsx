import { Button, Input, Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { useMeContext } from '@lib/context'
import { auth, googleAuthProvider } from '@lib/firebase'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

const Enter: NextPage = () => {
  const { user, username } = useMeContext()
  const router = useRouter()

  useEffect(() => {
    if (user && username) {
      router.replace('/')
    }
  })

  return (
    <Layout variant='small'>
      <Stack align='center'>
        {user ? !username && <UsernameForm /> : <SignInButton />}
      </Stack>
    </Layout>
  )
}

const SignInButton = () => {
  const [loading, setLoading] = useState(false)
  const handleSignIn = async () => {
    setLoading(true)
    try {
      const { user } = await auth.signInWithPopup(googleAuthProvider)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }
  return (
    <Button isLoading={loading} onClick={handleSignIn}>
      Sign In With Google
    </Button>
  )
}
const UsernameForm = () => <Input />

export default Enter
