import {
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

interface PostContentProps {
  post: Post | Data
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <Stack pb={8} as='section' w='full'>
      <Stack spacing={1} as='header'>
        <Heading fontSize='3xl'>{post.title}</Heading>
        <Text color={useColors('gray')}>
          Written by{' '}
          <Link href={`/${post.username}`}>
            <ChakraLink as='span' color={useColors('blue')}>
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
