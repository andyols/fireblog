import {
  Heading,
  Link as ChakraLink,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { timestampToDate } from '@lib/firebase'
import { Post } from '@lib/types'
import React from 'react'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { Markdown } from './Markdown'

interface PostContentProps {
  post: Post | Data
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <Stack pb={8} as='section'>
      <Stack spacing={1} as='header'>
        <Heading fontSize='3xl'>{post.title}</Heading>
        <Text color='gray.500'>
          Written by{' '}
          <Link href={`/${post.username}`}>
            <ChakraLink as='span' color='messenger.500'>
              @{post.username}
            </ChakraLink>
          </Link>{' '}
          on {timestampToDate(post.createdAt).toDateString()}
        </Text>
      </Stack>
      <Markdown markdown={post.content} />
    </Stack>
  )
}
