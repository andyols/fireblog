import { AdminPosts } from '@components/AdminPosts'
import { Layout } from '@components/Layout'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'

const AdminPostsPage = () => {
  return (
    <Layout title='My Posts'>
      <AdminPosts />
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminPostsPage
