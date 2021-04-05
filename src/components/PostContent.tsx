import {
  Divider,
  Heading,
  Link as ChakraLink,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { timestampToDate } from '@lib/firebase'
import { Post } from '@lib/types'
import { useColors } from '@utils/useColors'
import React from 'react'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { Markdown } from './Markdown'
import { PostWrapper } from './PostWrapper'

interface PostContentProps {
  post: Post | Data
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <PostWrapper variant='flushed'>
      <Stack spacing={1}>
        <Heading fontSize={['2xl', '3xl']}>{post.title}</Heading>
        <Text color={useColors('gray')} fontSize={['sm', 'md']}>
          Written by{' '}
          <Link href={`/${post.username}`}>
            <ChakraLink as='span' color={useColors('blue')}>
              @{post.username}
            </ChakraLink>
          </Link>{' '}
          on {timestampToDate(post.createdAt).toDateString()}
        </Text>
      </Stack>
      <Divider pt={2} mb={4} />
      <Markdown markdown={post.content} />
    </PostWrapper>
  )
}
