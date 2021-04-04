import {
  Badge,
  Button,
  HStack,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react'
import { Post } from '@lib/types'
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { DeletePostConfirmation } from './DeletePostConfirmation'

interface PostItemProps {
  admin: Boolean
  post: Post
}

export const PostItem: React.FC<PostItemProps> = ({ admin, post }) => {
  const wordCount = post.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 100 + 1).toFixed(0)

  return (
    <HStack
      justify='space-between'
      bg={useColors('paper')}
      p={4}
      borderRadius='base'
      border='1px solid'
      borderColor={useColors('border')}
      as='article'
    >
      <Stack spacing={0} w='full'>
        <Stack
          w='full'
          justify='space-between'
          align='start'
          direction={['column', 'row']}
        >
          <Stack spacing={0}>
            {/* POST TITLE */}
            {post.published ? (
              <Link href={`/${post.username}/${post.slug}`} passHref>
                <ChakraLink fontWeight='semibold' fontSize={['xl', '2xl']}>
                  {post.title}
                </ChakraLink>
              </Link>
            ) : (
              <Text fontWeight='semibold' fontSize='2xl'>
                {post.title}
              </Text>
            )}
            {/* POST AUTHOR */}
            <Link href={`/${post.username}`} passHref>
              <ChakraLink color={useColors('blue')}>
                @{post.username}
              </ChakraLink>
            </Link>
            {/* POST READ TIME */}
            {!admin && (
              <Text pt={2} color={useColors('gray')} fontSize='sm'>
                ⏳ {minutesToRead} min read
              </Text>
            )}
          </Stack>
          <HStack>
            {/* POST STATUS */}
            {admin && (
              <Badge colorScheme={post.published ? 'whatsapp' : 'gray'}>
                {post.published ? 'published' : 'private'}
              </Badge>
            )}
            {/* POST BLAZE COUNT */}
            {post.blazeCount > 0 && (
              <Text color={useColors('gray')} fontSize='sm'>
                🔥 {post.blazeCount}
              </Text>
            )}
          </HStack>
        </Stack>
        {/* POST ACTIONS */}
        {admin && (
          <HStack pt={4} align='start' justify='space-between'>
            <Link href={`admin/${post.slug}`}>
              <Button
                leftIcon={<FiEdit />}
                color={useColors('green')}
                size='sm'
                fontSize='md'
              >
                Edit
              </Button>
            </Link>
            <DeletePostConfirmation slug={post.slug} />
          </HStack>
        )}
      </Stack>
    </HStack>
  )
}
