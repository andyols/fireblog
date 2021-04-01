import { auth } from '@lib/firebase'

/**
 * Checks to see if the current client-side user is anonymous or not
 */
export const isUserAnonymous = () => !auth.currentUser?.providerData.length
