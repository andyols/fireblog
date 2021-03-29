import { Button, Heading } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostFeed } from '@components/PostFeed'
import { convertTimestamp, firestore, postToJSON } from '@lib/firebase'
import { Post } from '@lib/types'
import { NextPage } from 'next'
import { useState } from 'react'

interface PageProps {
  initialPosts: Post[]
}
const LIMIT = 1

const HomePage: NextPage<PageProps> = ({ initialPosts }) => {
  const [feed, setFeed] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)

    const last = feed[feed.length - 1]
    const cursor = convertTimestamp(last.createdAt)

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)

    try {
      const newPosts = (await query.get()).docs.map((doc) =>
        doc.data()
      ) as Post[]

      if (newPosts.length < LIMIT) {
        setPostsEnd(true)
      }

      setFeed([...feed, ...newPosts])
    } catch (e) {
      console.error(e.message)
    }
    setLoading(false)
  }

  return (
    <Layout>
      <PageHead pageTitle='Home' />
      <Heading>Latest Posts</Heading>
      {initialPosts && <PostFeed posts={feed} />}
      <Button
        isLoading={loading}
        isDisabled={postsEnd}
        placeSelf='center'
        colorScheme='messenger'
        onClick={getMorePosts}
      >
        {postsEnd ? 'No more posts' : 'Load more'}
      </Button>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  let initialPosts = null
  try {
    initialPosts = (await postsQuery.get()).docs.map(postToJSON)
  } catch (e) {
    console.error(e.message)
  }

  return {
    props: { initialPosts }
  }
}

export default HomePage
