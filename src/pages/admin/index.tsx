import { AdminPosts } from '@components/AdminPosts'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { Gatekeeper } from '@utils/Gatekeeper'

const AdminPostsPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='My Posts' />
      <AdminPosts />
    </Layout>
  )
}

export const getServerSideProps = Gatekeeper

export default AdminPostsPage
