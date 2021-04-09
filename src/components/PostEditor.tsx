import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { DocumentData, DocumentReference } from '@firebase/firestore-types'
import { auth, firestore, serverTimestamp } from '@lib/firebase'
import { Post } from '@lib/types'
import { firebaseErrorToast } from '@utils/firebaseErrorToast'
import { successToast } from '@utils/successToast'
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
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, watch, formState, errors } = useForm({
    defaultValues,
    mode: 'onChange'
  })
  const { isDirty, isValid } = formState

  const textAreaBg = useColors('paper')
  const textAreaBorder = useColors('border')

  const updatePost = async ({ content, published = false }: Partial<Post>) => {
    setLoading(true)
    try {
      await postRef.update({
        content,
        published,
        updatedAt: serverTimestamp()
      })

      reset({ content })
      successToast('Post updated 📨')
      setLoading(false)
    } catch (e) {
      console.error(e.message)
      firebaseErrorToast(e.message)
      setLoading(false)
    }
  }

  return (
    <>
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
          <Checkbox
            colorScheme='whatsapp'
            name='published'
            ref={register}
            placeSelf='start'
          >
            Publish?
          </Checkbox>
          <Textarea
            name='content'
            ref={register({
              maxLength: { value: 20000, message: 'Content is too long!' },
              minLength: { value: 10, message: 'Content is too short!' },
              required: 'Content is required!'
            })}
            bg={textAreaBg}
            borderColor={textAreaBorder}
            resize='none'
            h='50vh'
            spellCheck={false}
          />
          <FormErrorMessage>{errors['content']?.message}</FormErrorMessage>{' '}
          <ImageUploader postRef={postRef} />
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
      </FormControl>
    </>
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
        <Heading fontSize={['xl', '2xl']}>
          {preview ? '📄 ' : '📝 '}
          {post.title}
        </Heading>
        <HStack>
          <Button
            onClick={() => setPreview(!preview)}
            colorScheme={preview ? 'messenger' : 'gray'}
          >
            👀 Preview
          </Button>
          <Link href={`/${post.username}/${post.slug}`}>
            <Button isDisabled={!post.published}>🎥 Live View</Button>
          </Link>
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
