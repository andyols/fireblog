import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostContent } from '@components/PostContent'
import { firestore, getUserWithUsername, postToJSON } from '@lib/firebase'
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
    <Layout>
      <PageHead pageTitle={`${realPost.slug}`} />
      <PostContent post={realPost} />
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

  let post = null
  let path = null

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug)
    post = postToJSON(await postRef.get())
    path = postRef.path
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
