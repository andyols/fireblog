import {
  Badge,
  Box,
  Button,
  ButtonGroup,
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
        <HStack w='full' justify='space-between' align='start'>
          {post.published ? (
            <Link href={`/${post.username}/${post.slug}`} passHref>
              <ChakraLink fontWeight='semibold' fontSize='2xl'>
                {post.title}
              </ChakraLink>
            </Link>
          ) : (
            <Text fontWeight='semibold' fontSize='2xl'>
              {post.title}
            </Text>
          )}
          <HStack>
            {admin && (
              <Badge colorScheme={post.published ? 'whatsapp' : 'gray'}>
                {post.published ? 'published' : 'private'}
              </Badge>
            )}
            {post.blazeCount > 0 && (
              <Text
                color={useColors('gray')}
                fontSize='sm'
                fontWeight='semibold'
              >
                {post.blazeCount} 🔥
              </Text>
            )}
          </HStack>
        </HStack>
        <Box>
          <Link href={`/${post.username}`} passHref>
            <ChakraLink color={useColors('blue')}>@{post.username}</ChakraLink>
          </Link>
        </Box>
        <Text pt={2} color={useColors('gray')} fontSize='sm'>
          ⏳ {minutesToRead} min read
        </Text>
        {admin && (
          <ButtonGroup pt={4} size='sm' align='flex-start'>
            <Link href={`admin/${post.slug}`}>
              <Button leftIcon={<FiEdit />} color={useColors('green')}>
                Edit
              </Button>
            </Link>
            <DeletePostConfirmation slug={post.slug} />
          </ButtonGroup>
        )}
      </Stack>
    </HStack>
  )
}
