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
      bg='white'
      p={4}
      borderRadius='base'
      shadow='xs'
      as='article'
    >
      <Stack spacing={0} w='full'>
        <HStack w='full' justify='space-between' align='start'>
          {post.published ? (
            <Link href={`/${post.username}/${post.slug}`}>
              <ChakraLink fontWeight='semibold' fontSize='lg'>
                {post.title}
              </ChakraLink>
            </Link>
          ) : (
            <Text fontWeight='semibold' fontSize='lg'>
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
              <Text color='gray.800' fontSize='sm' fontWeight='semibold'>
                {post.blazeCount} 🔥
              </Text>
            )}
          </HStack>
        </HStack>
        <Box>
          <Link href={`/${post.username}`}>
            <ChakraLink color='messenger.500'>@{post.username}</ChakraLink>
          </Link>
        </Box>
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
    </HStack>
  )
}
