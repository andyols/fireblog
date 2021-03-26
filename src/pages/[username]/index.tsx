import { Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostFeed } from '@components/PostFeed'
import { UserProfile } from '@components/UserProfile'
import { getUserWithUsername, postToJSON } from '@lib/firebase'
import { Post, User } from '@lib/types'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'

interface PageProps {
  user: User
  posts: Post[]
}

const UserProfilePage: NextPage<PageProps> = ({ user, posts }) => {
  return (
    <Layout>
      <PageHead pageTitle='My Profile' />
      <Stack align='center'>
        {user && <UserProfile user={user} />}
        {posts && <PostFeed posts={posts} />}
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query

  const userDoc = await getUserWithUsername(username as string)

  let user = null
  let posts = null

  if (userDoc) {
    user = userDoc.data()
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)

    try {
      posts = (await postsQuery.get()).docs.map(postToJSON)
    } catch (e) {
      console.error(e.message)
    }
  }

  return {
    props: { user, posts }
  }
}

export default UserProfilePage
