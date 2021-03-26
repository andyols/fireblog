import {
  Button,
  HStack,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react'
import { Post } from '@lib/types'
import React from 'react'

interface PostFeedProps {
  posts: Post[]
}
interface PostItemProps {
  post: Post
}

export const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {
  return (
    <Stack w='full'>
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} />
      ))}
    </Stack>
  )
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <HStack
      justify='space-between'
      bg='white'
      p={4}
      borderRadius='base'
      shadow='base'
    >
      <Stack spacing={0}>
        <ChakraLink fontWeight='semibold'>{post.title}</ChakraLink>
        <ChakraLink color='messenger.500'>@{post.username}</ChakraLink>
        <Text pt={2}>{post.content}</Text>
      </Stack>
      <Stack placeSelf='start'>
        <Button
          variant='link'
          _hover={{ textDecor: 'none', filter: 'grayscale(0)' }}
          filter={`grayscale(1)`} // will be dynamic in the future
        >
          🔥
        </Button>
      </Stack>
    </HStack>
  )
}
