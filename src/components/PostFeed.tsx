import {
  Button,
  HStack,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react'
import { Post } from '@lib/types'
import Link from 'next/link'
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
  const wordCount = post.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 100 + 1).toFixed(0)

  return (
    <HStack
      justify='space-between'
      bg='white'
      p={4}
      borderRadius='base'
      shadow='xs'
    >
      <Stack spacing={0}>
        <Link href={`/${post.username}/${post.slug}`}>
          <ChakraLink fontWeight='semibold'>{post.title}</ChakraLink>
        </Link>
        <Link href={`/${post.username}`}>
          <ChakraLink color='messenger.500'>@{post.username}</ChakraLink>
        </Link>
        <Text pt={2} color='gray.600' fontSize='sm'>
          ⏳ {minutesToRead} min read
        </Text>
      </Stack>
      <HStack placeSelf='start' spacing={0}>
        <Text mr={-2} color='gray.800' fontSize='sm' fontWeight='semibold'>
          {post.blazeCount} blaze{post.blazeCount !== 1 && 's'}
        </Text>
        <Button
          variant='link'
          _hover={{ textDecor: 'none', filter: 'grayscale(0)' }}
          filter={`grayscale(1)`} // will be dynamic in the future
        >
          🔥
        </Button>
      </HStack>
    </HStack>
  )
}
