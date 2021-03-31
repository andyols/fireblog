import {
  Button,
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
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { useForm } from 'react-hook-form'
import { ImageUploader } from './ImageUploader'
import { Loader } from './Loader'
import { Markdown } from './Markdown'

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

  const updatePost = async ({ content }: Partial<Post>) => {
    setLoading(true)
    try {
      await postRef.update({
        content,
        updatedAt: serverTimestamp()
      })

      reset({ content })

      toast({
        ...TOAST_SUCCESS,
        title: 'Post updated! 👍'
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
      {preview && <Markdown markdown={watch('content')} />}
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
            bg='white'
            h={64}
            spellCheck={false}
          />
          <FormErrorMessage>{errors['content']?.message}</FormErrorMessage>
          <Stack align='start'>
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
          </Stack>
        </Stack>
      </FormControl>
    </Stack>
  )
}

export const PostEditor: React.FC = () => {
  const [preview, setPreview] = useState(false)

  const router = useRouter()
  const slug = router.query.slug as string

  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
    .doc(slug)

  const [post, loading] = useDocumentDataOnce(postRef)

  if (loading) return <Loader />

  return !post ? null : (
    <>
      <Heading fontSize='2xl'>{post.title}</Heading>
      <HStack align='start' justify='start' pt={2} w='full'>
        <PostForm defaultValues={post} postRef={postRef} preview={preview} />
        <Stack position='sticky' top={8} as='aside'>
          <Button
            onClick={() => setPreview(!preview)}
            colorScheme={preview ? 'messenger' : 'gray'}
          >
            👀 Preview
          </Button>
          <Link href={`/${post.username}/${post.slug}`}>
            <Button>🎥 Live View</Button>
          </Link>
        </Stack>
      </HStack>
    </>
  )
}
