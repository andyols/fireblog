import {
  Button,
  ButtonGroup,
  HStack,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react'
import { Post } from '@lib/types'
import Link from 'next/link'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { DeletePostConfirmation } from './DeletePostConfirmation'

interface PostFeedProps {
  admin?: Boolean
  posts: Post[]
}
interface PostItemProps {
  admin: Boolean
  post: Post
}

export const PostFeed: React.FC<PostFeedProps> = ({ admin, posts }) => {
  return (
    <Stack w='full'>
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin || false} />
      ))}
    </Stack>
  )
}

const PostItem: React.FC<PostItemProps> = ({ admin, post }) => {
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
          <ChakraLink fontWeight='semibold' fontSize='lg'>
            {post.title}
          </ChakraLink>
        </Link>
        <Link href={`/${post.username}`}>
          <ChakraLink color='messenger.500'>@{post.username}</ChakraLink>
        </Link>
        <Text pt={2} color='gray.600' fontSize='sm'>
          ⏳ {minutesToRead} min read
        </Text>
        {admin && (
          <ButtonGroup pt={4} size='sm' align='flex-start'>
            <Link href={`admin/${post.slug}`}>
              <Button leftIcon={<FiEdit />} color='messenger.500'>
                Edit
              </Button>
            </Link>
            <DeletePostConfirmation slug={post.slug} />
          </ButtonGroup>
        )}
      </Stack>
      <Stack h='full' justify='space-between' align='flex-end'>
        <HStack spacing={0}>
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
      </Stack>
    </HStack>
  )
}
