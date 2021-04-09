import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { AuthProvider } from '@firebase/auth-types'
import { USER_ACCOUNT_ALREADY_EXISTS } from '@lib/constants'
import { auth, githubAuthProvider, googleAuthProvider } from '@lib/firebase'
import { firebaseErrorToast } from '@utils/firebaseErrorToast'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

export const SignInButtons: React.FC = () => {
  const githubBg = useColorModeValue('gray.800', 'black')
  const githubHoverBg = useColorModeValue('black', 'rgb(0,0,0,0.5)')
  const githubColor = useColorModeValue('white', 'gray.100')

  // error handling state
  const [providerError, setProviderError] = useState(false)
  const [email, setEmail] = useState('')

  const signInWithProvider = async (provider: AuthProvider) => {
    try {
      await auth.signInWithPopup(provider)
    } catch (e) {
      if (e.code === USER_ACCOUNT_ALREADY_EXISTS) {
        setProviderError(true)
        setEmail(e.email)
        return
      }

      firebaseErrorToast(e.message, e.code)
      console.error(e)
    }
  }

  return (
    <Stack h='full' align='center' spacing={8}>
      <Stack mt={4}>
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
      </Stack>
      {providerError && (
        <Stack align='center'>
          <Alert status='warning' borderRadius='base' maxW='lg'>
            <HStack align='start'>
              <AlertIcon />
              <Box>
                <Text>
                  It looks like you already have an account associated with{' '}
                  <Text as='span' fontWeight='semibold'>
                    ({email ? email : 'this email'}).{' '}
                  </Text>
                  Try signing in with the original provider.
                </Text>
              </Box>
            </HStack>
          </Alert>
          <Alert status='info' borderRadius='base' maxW='lg'>
            <HStack align='start'>
              <AlertIcon />
              <Text mt={2}>
                Account provider linking is available in account settings.
              </Text>
            </HStack>
          </Alert>
        </Stack>
      )}
    </Stack>
  )
}
