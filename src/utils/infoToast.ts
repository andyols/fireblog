import { createStandaloneToast } from '@chakra-ui/react'
import { TOAST_INFO } from '@lib/constants'

/**
 * Reusable info toast notification
 * @param message
 */
export const infoToast = async (
  description: string,
  title?: string,
  duration?: number
) => {
  const toast = createStandaloneToast()

  toast.closeAll()
  toast({
    ...TOAST_INFO,
    title,
    description,
    duration
  })
}
