import { Heading } from '@chakra-ui/react'
import { Gatekeeper } from '@components/Gatekeeper'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { NextPage } from 'next'

const AdminPostsPage: NextPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='My Posts' />
      <Gatekeeper>
        <Heading>Admin Posts Page</Heading>
      </Gatekeeper>
    </Layout>
  )
}

export default AdminPostsPage
