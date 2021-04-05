import { Heading } from '@chakra-ui/react'
import { AdminPosts } from '@components/AdminPosts'
import { Layout } from '@components/Layout'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'
import React from 'react'

const AdminPostsPage = () => {
  return (
    <Layout title='My Posts' variant='relaxed'>
      <Heading as='h1' fontSize='xl'>
        My Posts
      </Heading>
      <AdminPosts />
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminPostsPage
