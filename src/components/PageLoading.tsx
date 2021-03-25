import React from 'react'
import { Layout } from './Layout'
import { Loader } from './Loader'

export const PageLoading: React.FC = () => {
  return (
    <Layout>
      <Loader />
    </Layout>
  )
}
