import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostEditor } from '@components/PostEditor'

const AdminPostEditPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='Edit Post' />
      <PostEditor />
    </Layout>
  )
}

// export const getServerSideProps = getServerSideAuthProps

export default AdminPostEditPage
