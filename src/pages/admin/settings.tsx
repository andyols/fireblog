import { Heading } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { getServerSideAuthProps } from '@utils/getServerSideAuthProps'
import { NextPage } from 'next'
import React from 'react'

interface PageProps {
  name?: string
}

const AdminSettingsPage: NextPage<PageProps> = ({ name }) => {
  return (
    <Layout title='My Account'>
      <Heading as='h1' fontSize='xl' py={2}>
        {name?.length ? `Welcome, ${name}!` : 'Welcome!'}
      </Heading>
    </Layout>
  )
}

export const getServerSideProps = getServerSideAuthProps

export default AdminSettingsPage
