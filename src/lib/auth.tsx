import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './firebase'
import { User } from './types'

interface AuthContext {
  user: User | null | undefined
}

const AuthContext = createContext<AuthContext>({ user: null })
AuthContext.displayName = 'Auth'

export const AuthProvider: React.FC = ({ children }) => {
  const userData = useUserData()
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

/**
 * Custom hook to listen and update the current user's data
 * @returns The current user's data
 */
export const useUserData = (): AuthContext => {
  const [firebaseUser] = useAuthState(auth)
  const [user, setUser] = useState<User | null | undefined>(null)

  useEffect(() => {
    let unsubscribe

    if (firebaseUser) {
      // listen for a username and update state when it exists
      const ref = firestore.collection('users').doc(firebaseUser.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUser({
          displayName: firebaseUser?.displayName,
          photoURL: firebaseUser?.photoURL,
          uid: firebaseUser?.uid,
          username: doc.data()?.username
        })
      })
    } else {
      setUser(null)
    }

    return unsubscribe
  }, [firebaseUser])

  return { user }
}
