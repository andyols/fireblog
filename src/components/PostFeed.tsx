import { Stack } from '@chakra-ui/react'
import { Post } from '@lib/types'
import React from 'react'
import { PostItem } from './PostItem'

interface PostFeedProps {
  admin?: Boolean
  posts: Post[]
}

export const PostFeed: React.FC<PostFeedProps> = ({ admin, posts }) => {
  return (
    <Stack pb={4} w='full' as='section'>
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin || false} />
      ))}
    </Stack>
  )
}
