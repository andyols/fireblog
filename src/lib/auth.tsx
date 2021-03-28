import { User as FirebaseUser } from '@firebase/auth-types'
import Router from 'next/router'
import nookies from 'nookies'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, firestore } from './firebase'
import { User } from './types'

interface IAuthUser {
  user: User | null | undefined
}

const AuthContext = createContext<IAuthUser>({
  user: null
})
AuthContext.displayName = 'Auth'

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const user = useManageUser()
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to listen to and update the current user
 * @returns The current firebase user data formatted into custom User type
 *  */
export const useManageUser = (): IAuthUser => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  //  * triggers when auth state or firebase user token refreshes
  //  * update local state accordingly
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setFirebaseUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
        // redirect off of any admin pages when not authenticated
        if (Router.pathname.includes('admin')) {
          Router.replace('/')
        }
      } else {
        setFirebaseUser(user)
        try {
          const token = await user.getIdToken()
          setToken(token)
        } catch (e) {
          console.error(e.message)
        }
      }
    })
  }, [])

  //  * triggers in reaction to firebaseUser
  //  * formats the data into User type format
  useEffect(() => {
    let unsubscribe
    if (firebaseUser) {
      const ref = firestore.collection('users').doc(firebaseUser.uid)
      unsubscribe = ref.onSnapshot(async (doc) => {
        setAuthUser({
          displayName: firebaseUser?.displayName,
          photoURL: firebaseUser?.photoURL,
          uid: firebaseUser?.uid,
          username: doc.data()?.username
        })
      })
    } else {
      setAuthUser(null)
    }
    return unsubscribe
  }, [firebaseUser])

  //  * finally, set token in browser when User has been authenticated and has created a username
  useEffect(() => {
    if (token && authUser?.username?.length) {
      nookies.set(undefined, 'token', token, { path: '/' })
    }
  }, [token, authUser])

  return { user: authUser }
}
