import { Stack } from '@chakra-ui/react'
import { AuthCheck } from '@components/AuthCheck'
import { BlazeButton } from '@components/BlazeButton'
import { Layout } from '@components/Layout'
import { PostContent } from '@components/PostContent'
import {
  firestore,
  getUserWithUsername,
  postToJSON,
  timestampToDate
} from '@lib/firebase'
import { Post } from '@lib/types'
import { GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

interface PageProps {
  post: Post
  path: string
}
type TParams = {
  username: string
  slug: string
}
const REVALIDATE_INTERVAL = 5 // in seconds

const PostPage: NextPage<PageProps> = ({ post, path }) => {
  const postRef = firestore.doc(path)
  const [realtimePost] = useDocumentData(postRef)
  const realPost = realtimePost || post

  return (
    <Layout
      date={`${timestampToDate(realPost.createdAt).toISOString()}`}
      title={`${realPost.title}`}
      width='lg'
      variant='flushed'
    >
      <Stack direction={['column', 'column', 'row']}>
        {/* POST CONTENT */}
        <PostContent post={realPost} />

        {/* POST ACTIONS */}
        <AuthCheck
          fallback={<BlazeButton postRef={null} blazeCount={post.blazeCount} />}
        >
          <BlazeButton postRef={postRef} blazeCount={post.blazeCount} />
        </AuthCheck>
      </Stack>
    </Layout>
  )
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { username, slug } = params as TParams

  const encodedSlug = encodeURI(slug)

  const userDoc = await getUserWithUsername(username)
  if (!userDoc) {
    return { notFound: true }
  }

  const postRef = userDoc.ref.collection('posts').doc(encodedSlug)

  let post = null
  let path = null
  try {
    post = postToJSON(await postRef.get())

    if (!post || !post.published) {
      return { notFound: true }
    }

    path = postRef.path
  } catch (e) {
    console.error(e.message)
    return { notFound: true }
  }

  return {
    props: { post, path },
    revalidate: REVALIDATE_INTERVAL
  }
}

export const getStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup('posts').get()

  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data()
    return {
      params: { username, slug }
    }
  })

  return {
    paths,
    fallback: 'blocking' // use ssr if page has not been built yet
  }
}

export default PostPage
