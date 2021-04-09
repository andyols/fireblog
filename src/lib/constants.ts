import { ToastPosition } from '@chakra-ui/react'

// toasts
type DefaltToast = {
  position: ToastPosition
  duration: number
  isClosable: boolean
}

type Status = 'success' | 'error' | 'info' | 'warning' | undefined

const DEFAULT = {
  position: 'bottom-left',
  duration: 5000,
  isClosable: true
} as DefaltToast

export const TOAST_TIMEOUT = 250

export const TOAST_SUCCESS = {
  ...DEFAULT,
  status: 'success' as Status
}

export const TOAST_ERROR = {
  ...DEFAULT,
  duration: 10000,
  status: 'error' as Status
}

export const TOAST_INFO = {
  ...DEFAULT,
  status: 'info' as Status
}

export const TOAST_WARNING = {
  ...DEFAULT,
  status: 'warning' as Status
}

// firebase error codes
export const UNAUTHORIZED_DOMAIN = 'auth/unauthorized-domain'
export const USER_PERMISSION_DENIED = 'permission-denied'
export const USER_CLOSED_POPUP = 'auth/popup-closed-by-user'
export const USER_ACCOUNT_ALREADY_EXISTS =
  'auth/account-exists-with-different-credential'
