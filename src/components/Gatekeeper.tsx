import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Link as ChakraLink
} from '@chakra-ui/react'
import { useAuth } from '@lib/auth'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { ReactElement } from 'react'

interface GatekeeperProps {
  children: ReactElement<any, any> | null
  fallback?: ReactElement<any, any> | null
}

export const Gatekeeper: React.FC<GatekeeperProps> = ({
  children,
  fallback
}) => {
  const { username } = useAuth()
  const router = useRouter()

  return username
    ? children
    : fallback || (
        <Box placeSelf='center'>
          <Alert borderRadius='base' status='error' shadow='xs'>
            <AlertIcon />
            <AlertTitle>Halt!</AlertTitle>
            <AlertDescription>
              You violated the law. Pay the court a fine or
              <Link href={`/enter?redirect=${router.pathname}`}>
                <ChakraLink color='messenger.500'> sign in </ChakraLink>
              </Link>
              to view this page.
            </AlertDescription>
          </Alert>
        </Box>
      )
}
