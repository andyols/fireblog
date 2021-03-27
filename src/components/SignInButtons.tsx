import { Button } from '@chakra-ui/react'
import { AuthProvider } from '@firebase/auth-types'
import { auth, githubAuthProvider, googleAuthProvider } from '@lib/firebase'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FiGithub } from 'react-icons/fi'

export const SignInButtons: React.FC = () => {
  const handleSignIn = async (provider: AuthProvider) => {
    try {
      await auth.signInWithPopup(provider)
    } catch (e) {
      console.error(e.message)
    }
  }
  return (
    <>
      <Button
        leftIcon={<FcGoogle />}
        onClick={() => handleSignIn(googleAuthProvider)}
      >
        Sign In With Google
      </Button>
      <Button
        leftIcon={<FiGithub />}
        onClick={() => handleSignIn(githubAuthProvider)}
      >
        Sign In With GitHub
      </Button>
    </>
  )
}
