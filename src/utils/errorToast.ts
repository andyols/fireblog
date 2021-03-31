import { createStandaloneToast } from '@chakra-ui/react'
import { TOAST_ERROR } from '@lib/constants'

/**
 * Reusable error toast notification to be used in firebase error handling
 * @param description
 * @returns A chakra-ui error toast displaying the given message
 */
export const errorToast = (description: string) => {
  const toast = createStandaloneToast()
  return toast({
    ...TOAST_ERROR,
    title: 'Oops! Something went wrong.',
    description
  })
}
