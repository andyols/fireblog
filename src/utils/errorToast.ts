import { createStandaloneToast } from '@chakra-ui/react'
import { TOAST_ERROR } from '@lib/constants'

/**
 * Reusable info toast notification
 * @param message
 */
export const errorToast = async (
  description: string,
  title?: string,
  duration?: number
) => {
  const toast = createStandaloneToast()

  toast.closeAll()
  toast({
    ...TOAST_ERROR,
    title,
    description,
    duration
  })
}
