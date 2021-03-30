import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostEditor } from '@components/PostEditor'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'

const AdminPostEditPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='Edit Post' />
      <PostEditor />
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminPostEditPage
