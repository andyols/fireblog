import { Layout } from '@components/Layout'
import { PostEditor } from '@components/PostEditor'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'

const AdminPostEditPage = () => {
  return (
    <Layout title='Editing Post' width='lg'>
      <PostEditor />
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminPostEditPage
