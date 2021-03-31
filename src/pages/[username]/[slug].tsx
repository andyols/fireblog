import { HStack } from '@chakra-ui/react'
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
import { useDocumentData } from 'react-firebase-hooks/firestore'

interface PageProps {
  post: Post
  path: string
}

const PostPage: NextPage<PageProps> = ({ post, path }) => {
  const postRef = firestore.doc(path)
  const [realtimePost] = useDocumentData(postRef)
  const realPost = realtimePost || post

  return (
    <Layout
      title={`${realPost.title}`}
      date={`${timestampToDate(realPost.createdAt).toISOString()}`}
    >
      <HStack align='start' justify='start' w='full' spacing={4}>
        <PostContent post={realPost} />
        <AuthCheck fallback={<BlazeButton postRef={null} />}>
          <BlazeButton postRef={postRef} />
        </AuthCheck>
      </HStack>
    </Layout>
  )
}

type Params = {
  username: string
  slug: string
}
const REVALIDATE_INTERVAL = 5 // in seconds

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { username, slug } = params as Params

  const userDoc = await getUserWithUsername(username)
  if (!userDoc) {
    return { notFound: true }
  }

  const postRef = userDoc.ref.collection('posts').doc(slug)

  let post = null
  let path = null
  try {
    post = postToJSON(await postRef.get())

    if (!post) {
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
