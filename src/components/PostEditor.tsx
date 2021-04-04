import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { DocumentData, DocumentReference } from '@firebase/firestore-types'
import { TOAST_SUCCESS } from '@lib/constants'
import { auth, firestore, serverTimestamp } from '@lib/firebase'
import { Post } from '@lib/types'
import { errorToast } from '@utils/errorToast'
import { isUserAnonymous } from '@utils/isUserAnonymous'
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { useForm } from 'react-hook-form'
import { ImageUploader } from './ImageUploader'
import { Loader } from './Loader'
import { Markdown } from './Markdown'
import { PostWrapper } from './PostWrapper'

interface PostFormProps {
  defaultValues: Data<DocumentData, '', ''>
  postRef: DocumentReference
  preview: boolean | undefined
}

const PostForm: React.FC<PostFormProps> = ({
  defaultValues,
  postRef,
  preview
}) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, watch, formState, errors } = useForm({
    defaultValues,
    mode: 'onChange'
  })
  const { isDirty, isValid } = formState

  const updatePost = async ({ content, published }: Partial<Post>) => {
    setLoading(true)
    try {
      await postRef.update({
        content,
        published,
        updatedAt: serverTimestamp()
      })

      reset({ content })

      toast({
        ...TOAST_SUCCESS,
        title: `Post updated! 👍`
      })

      setLoading(false)
    } catch (e) {
      console.error(e.message)
      errorToast(e.message)
      setLoading(false)
    }
  }

  return (
    <Stack w='full' as='section'>
      {preview && (
        <PostWrapper>
          <Markdown markdown={watch('content')} />
        </PostWrapper>
      )}
      <FormControl
        as='form'
        onSubmit={handleSubmit(updatePost)}
        hidden={preview}
        isInvalid={!!errors['content']}
      >
        <Stack>
          <Textarea
            name='content'
            ref={register({
              maxLength: { value: 20000, message: 'Content is too long!' },
              minLength: { value: 10, message: 'Content is too short!' },
              required: 'Content is required!'
            })}
            bg={useColors('paper')}
            borderColor={useColors('border')}
            resize='none'
            h='60vh'
            spellCheck={false}
          />
          <FormErrorMessage>{errors['content']?.message}</FormErrorMessage>
          <Stack align='start' spacing={4}>
            <HStack w='full' justify='space-between'>
              <ImageUploader />
              <Button
                type='submit'
                colorScheme='whatsapp'
                isLoading={loading}
                isDisabled={!isValid || !isDirty}
                placeSelf='start'
              >
                Save Changes
              </Button>
            </HStack>
            {!isUserAnonymous() && (
              <Checkbox colorScheme='whatsapp' name='published' ref={register}>
                Publish?
              </Checkbox>
            )}
          </Stack>
        </Stack>
      </FormControl>
    </Stack>
  )
}

export const PostEditor: React.FC = () => {
  const [preview, setPreview] = useState(false)

  const router = useRouter()
  const slug = encodeURI(router.query.slug as string)

  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
    .doc(slug)

  const [post, loading] = useDocumentData(postRef)

  if (loading) return <Loader />

  return !post ? null : (
    <>
      <Stack direction={['column', 'column', 'row']} justify='space-between'>
        <Heading>{post.title}</Heading>
        <HStack>
          <Button
            onClick={() => setPreview(!preview)}
            colorScheme={preview ? 'messenger' : 'gray'}
          >
            👀 Preview
          </Button>
          {post.published && (
            <Link href={`/${post.username}/${post.slug}`}>
              <Button>🎥 Live View</Button>
            </Link>
          )}
        </HStack>
      </Stack>
      <Stack
        direction={['column', 'column', 'row']}
        w='full'
        spacing={[0, 0, 4]}
      >
        <PostForm defaultValues={post} postRef={postRef} preview={preview} />
      </Stack>
    </>
  )
}
