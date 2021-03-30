import { useAuth } from '@lib/auth'
import React, { ReactElement } from 'react'

interface AuthCheckProps {
  children: ReactElement<any, any> | null
  fallback: ReactElement<any, any> | null
}

export const AuthCheck: React.FC<AuthCheckProps> = ({ children, fallback }) => {
  const { user } = useAuth()
  const userAuthenticated = !!user?.username

  return userAuthenticated ? children : fallback
}
