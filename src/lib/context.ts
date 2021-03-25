import { User } from '@firebase/auth-types'
import { createContext, useContext } from 'react'

export type ContextType = {
  user: User | null | undefined
  username: string | null
}

export const MeContext = createContext<ContextType>({
  user: null,
  username: null
})

MeContext.displayName = 'Me'

export const useMeContext = () => useContext(MeContext)
