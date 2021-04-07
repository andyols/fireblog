import { Button, Heading, Link as ChakraLink, Text } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { PostFeed } from '@components/PostFeed'
import { convertTimestamp, firestore, postToJSON } from '@lib/firebase'
import { Feed, Post } from '@lib/types'
import { useColors } from '@utils/useColors'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

interface PageProps {
  initialPosts: Post[]
}
const LIMIT = 3

const HomePage: NextPage<PageProps> = ({ initialPosts }) => {
  const [feed, setFeed] = useState<Feed>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)
  const linkColor = useColors('blue')

  const getMorePosts = async () => {
    if (!feed?.length) {
      return
    }

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
      <Heading as='h1' fontSize='xl' py={2}>
        Latest Posts
      </Heading>
      {!feed?.length ? (
        <Text>
          There are currently no published posts.{' '}
          <Link href='/admin'>
            <ChakraLink color={linkColor} fontWeight='semibold'>
              Be the first!
            </ChakraLink>
          </Link>
        </Text>
      ) : (
        <>
          <PostFeed posts={feed} />
          <Button
            isLoading={loading}
            isDisabled={postsEnd}
            placeSelf='center'
            colorScheme='messenger'
            onClick={getMorePosts}
          >
            {postsEnd ? 'No more posts' : 'Load more'}
          </Button>
        </>
      )}
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
