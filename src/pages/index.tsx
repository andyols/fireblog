import { Heading } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <Layout>
      <PageHead pageTitle='Home' />
      <Heading>Hello, world!</Heading>
    </Layout>
  )
}

export default HomePage
