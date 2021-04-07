import { Stack } from '@chakra-ui/react'
import { Feed } from '@lib/types'
import React from 'react'
import { PostItem } from './PostItem'

interface PostFeedProps {
  admin?: Boolean
  profile?: Boolean
  posts: Feed
}

export const PostFeed: React.FC<PostFeedProps> = ({
  admin = false,
  profile = false,
  posts
}) => {
  return (
    <Stack w='full' as='section'>
      {posts?.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} profile={profile} />
      ))}
    </Stack>
  )
}
