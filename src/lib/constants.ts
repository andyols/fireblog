import { ToastPosition } from '@chakra-ui/react'

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

export const TOAST_SUCCESS = {
  ...DEFAULT,
  status: 'success' as Status
}

export const TOAST_ERROR = {
  ...DEFAULT,
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
