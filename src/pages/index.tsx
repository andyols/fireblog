import { Button, Divider, Heading } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { PageHead } from '@components/PageHead'
import { PostFeed } from '@components/PostFeed'
import { convertTimestamp, firestore, postToJSON } from '@lib/firebase'
import { Post } from '@lib/types'
import { NextPage } from 'next'
import { useState } from 'react'

interface PageProps {
  posts: Post[]
}
const LIMIT = 2

const HomePage: NextPage<PageProps> = ({ posts }) => {
  const [feed, setFeed] = useState(posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    if (postsEnd) return
    setLoading(true)

    const last = posts[posts.length - 1]
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
      setFeed(posts.concat(newPosts))
      setLoading(false)
    } catch (e) {
      console.error(e.message)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <PageHead pageTitle='Home' />
      <Heading>Latest Posts</Heading>
      <Divider />
      {posts && <PostFeed posts={feed} />}
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

  let posts = null
  try {
    posts = (await postsQuery.get()).docs.map(postToJSON)
  } catch (e) {
    console.error(e.message)
  }

  return {
    props: { posts }
  }
}

export default HomePage
