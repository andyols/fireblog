import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostEditor } from '@components/PostEditor'
import { Gatekeeper } from '@utils/Gatekeeper'

const AdminPostEditPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='Edit Post' />
      <PostEditor />
    </Layout>
  )
}

export const getServerSideProps = Gatekeeper

export default AdminPostEditPage
