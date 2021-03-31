import { Button, Text } from '@chakra-ui/react'
import { AuthProvider } from '@firebase/auth-types'
import { auth, githubAuthProvider, googleAuthProvider } from '@lib/firebase'
import { firebaseErrorToast } from '@utils/firebaseErrorToast'
import React from 'react'
import { FaGoogle, FaMask } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

export const SignInButtons: React.FC = () => {
  const signInWithProvider = async (provider: AuthProvider) => {
    try {
      await auth.signInWithPopup(provider)
    } catch (e) {
      firebaseErrorToast(e.message)
      console.error(e.message)
    }
  }
  const signInAnonymously = async () => {
    try {
      await auth.signInAnonymously()
    } catch (e) {
      firebaseErrorToast(e.message)
      console.error(e.message)
    }
  }
  return (
    <>
      <Button
        colorScheme='messenger'
        leftIcon={<FaGoogle />}
        onClick={() => signInWithProvider(googleAuthProvider)}
      >
        Sign In With Google
      </Button>
      <Button
        bg='gray.700'
        color='white'
        _hover={{ bg: 'gray.800' }}
        leftIcon={<FiGithub />}
        onClick={() => signInWithProvider(githubAuthProvider)}
      >
        Sign In With GitHub
      </Button>
      <Text fontWeight='semibold'>OR</Text>
      <Button leftIcon={<FaMask />} onClick={() => signInAnonymously()}>
        Sign In Anonymously
      </Button>
    </>
  )
}
