import { createStandaloneToast } from '@chakra-ui/react'
import { TOAST_SUCCESS } from '@lib/constants'

/**
 * Reusable success toast notification
 * @param message
 */
export const successToast = async (
  description: string,
  title?: string,
  duration?: number
) => {
  const toast = createStandaloneToast()

  toast.closeAll()
  toast({
    ...TOAST_SUCCESS,
    title,
    description,
    duration
  })
}
