import { Button, useColorModeValue } from '@chakra-ui/react'
import { AuthProvider } from '@firebase/auth-types'
import { auth, githubAuthProvider, googleAuthProvider } from '@lib/firebase'
import { errorToast } from '@utils/errorToast'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

export const SignInButtons: React.FC = () => {
  const githubBg = useColorModeValue('gray.800', 'black')
  const githubHoverBg = useColorModeValue('black', 'rgb(0,0,0,0.5)')
  const githubColor = useColorModeValue('white', 'gray.100')

  const signInWithProvider = async (provider: AuthProvider) => {
    try {
      await auth.signInWithPopup(provider)
    } catch (e) {
      errorToast(e.message)
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
        bg={githubBg}
        color={githubColor}
        _hover={{ bg: githubHoverBg }}
        leftIcon={<FiGithub />}
        onClick={() => signInWithProvider(githubAuthProvider)}
      >
        Sign In With GitHub
      </Button>
    </>
  )
}
