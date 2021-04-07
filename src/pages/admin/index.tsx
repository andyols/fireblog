import { Heading } from '@chakra-ui/react'
import { AdminPosts } from '@components/AdminPosts'
import { Layout } from '@components/Layout'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'
import { NextPage } from 'next'
import React from 'react'

interface PageProps {
  name?: string
}

const AdminPostsPage: NextPage<PageProps> = ({ name }) => {
  return (
    <Layout title='My Posts'>
      <Heading as='h1' fontSize='xl' py={2}>
        {name?.length ? `Welcome, ${name}!` : 'Welcome!'}
      </Heading>
      <AdminPosts />
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminPostsPage
