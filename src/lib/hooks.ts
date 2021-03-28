import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from './auth'

export const useRedirect = () => {
  const router = useRouter()
  const redirect = router.query.redirect as string
  const { user } = useAuth()

  useEffect(() => {
    if (user?.username) {
      router.replace(redirect || '/')
    }
  }, [router, user, redirect])
}
