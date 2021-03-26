import { User } from '@firebase/auth-types'
import { createContext } from 'react'

export type ContextType = {
  user: User | null | undefined
  username: string | null
}

export const UserContext = createContext<ContextType>({
  user: null,
  username: null
})

UserContext.displayName = 'User'
