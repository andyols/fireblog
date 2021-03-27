import { AdminPosts } from '@components/AdminPosts'
import { Gatekeeper } from '@components/Gatekeeper'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { NextPage } from 'next'

const AdminPostsPage: NextPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='My Posts' />
      <Gatekeeper>
        <AdminPosts />
      </Gatekeeper>
    </Layout>
  )
}

export default AdminPostsPage
