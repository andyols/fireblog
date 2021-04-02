import { Stack } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
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
    <Layout title={`${user.username} (${user.displayName})`}>
      <Stack align='center' spacing={8}>
        {user && <UserProfile user={user} />}
        {posts && <PostFeed posts={posts} />}
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const username = query.username as string
  let user = null
  let posts = null

  const userDoc = await getUserWithUsername(username)
  if (!userDoc) {
    // force 404 page if no user
    return { notFound: true }
  }
  user = userDoc.data()

  const postsQuery = userDoc.ref
    .collection('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(5)

  // attempt query and convert each post document to JSON
  try {
    posts = (await postsQuery.get()).docs.map(postToJSON)
  } catch (e) {
    console.error(e.message)
    return { notFound: true }
  }
  return {
    props: { user, posts }
  }
}

export default UserProfilePage
