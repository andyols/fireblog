import { AdminPosts } from '@components/AdminPosts'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'

const AdminPostsPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='My Posts' />
      <AdminPosts />
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminPostsPage
