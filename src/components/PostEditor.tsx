import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { DocumentData, DocumentReference } from '@firebase/firestore-types'
import { auth, firestore, serverTimestamp } from '@lib/firebase'
import { Post } from '@lib/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { useForm } from 'react-hook-form'
import { FiCamera, FiEye } from 'react-icons/fi'
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
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues,
    mode: 'onBlur'
  })
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const updatePost = async ({ content, published }: Partial<Post>) => {
    setLoading(true)
    try {
      await postRef.update({
        content,
        published,
        updatedAt: serverTimestamp()
      })

      reset({ content, published })

      toast({
        status: 'success',
        title: 'Post updated! 👍',
        isClosable: true,
        position: 'bottom-left'
      })
      setLoading(false)
    } catch (e) {
      toast({
        status: 'error',
        title: 'Server error.',
        description: 'Check internet connection and try again.',
        isClosable: true,
        position: 'bottom-left'
      })
      console.error(e.message)
      setLoading(false)
    }
  }

  return (
    <Stack w='full' pb={12}>
      {preview && <Markdown markdown={watch('content')} />}
      <FormControl
        as='form'
        onSubmit={handleSubmit(updatePost)}
        hidden={preview}
      >
        <Stack>
          <Textarea
            name='content'
            ref={register}
            bg='white'
            h={64}
            spellCheck={false}
          />
          <Checkbox name='published' ref={register} pb={2}>
            Publish?
          </Checkbox>
          <Button
            type='submit'
            colorScheme='whatsapp'
            isLoading={loading}
            placeSelf='start'
          >
            Save Changes
          </Button>
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
      <Heading fontSize='3xl'>Editing {post.title}</Heading>
      <HStack justify='space-between' align='start' spacing={12} pt={2}>
        <PostForm defaultValues={post} postRef={postRef} preview={preview} />
        <Stack position='sticky' top={8}>
          <Button
            onClick={() => setPreview(!preview)}
            justifyContent='start'
            colorScheme={preview ? 'messenger' : 'gray'}
            leftIcon={<FiEye />}
          >
            Preview
          </Button>
          <Link href={`/${post.username}/${post.slug}`}>
            <Button justifyContent='start' leftIcon={<FiCamera />}>
              Live View
            </Button>
          </Link>
        </Stack>
      </HStack>
    </>
  )
}
