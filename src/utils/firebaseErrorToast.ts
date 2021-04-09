import { createStandaloneToast } from '@chakra-ui/react'
import {
  TOAST_ERROR,
  UNAUTHORIZED_DOMAIN,
  USER_ACCOUNT_ALREADY_EXISTS,
  USER_CLOSED_POPUP,
  USER_PERMISSION_DENIED
} from '@lib/constants'

/**
 * Reusable error toast notification to handle firebase errors
 * @param message the raw error message used as a fallback
 * @param code the error code
 */
export const firebaseErrorToast = async (message: string, code?: string) => {
  // don't toast if user just closed popup window
  if (code === USER_CLOSED_POPUP) return

  const toast = createStandaloneToast()

  const realMessage: Record<string, string> = {
    [UNAUTHORIZED_DOMAIN]: `Sorry, the authentication service is inactive`,
    [USER_PERMISSION_DENIED]: `Sorry, it doesn't look like you have permission to do that 🚧`,
    [USER_ACCOUNT_ALREADY_EXISTS]: `It looks like you already have an account associated with this email`
  }

  toast.closeAll()
  toast({
    ...TOAST_ERROR,
    title: 'Oops!',
    description: code ? realMessage[code] : message
  })
}
