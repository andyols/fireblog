import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAuth } from './auth'
import { auth, firestore } from './firebase'

export const useUserData = () => {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let unsubscribe

    if (user) {
      const ref = firestore.collection('users').doc(user.uid)
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }

    return unsubscribe
  }, [user])

  return { user, username }
}

export const useRedirect = () => {
  const router = useRouter()
  const redirect = router.query.redirect as string
  const { username } = useAuth()

  useEffect(() => {
    if (username) {
      router.replace(redirect || '/')
    }
  }, [router, username, redirect])
}
