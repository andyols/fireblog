import { Button, FormControl, Input, useToast } from '@chakra-ui/react'
import { Timestamp } from '@firebase/firestore-types'
import { useAuth } from '@lib/auth'
import { auth, firestore, serverTimestamp } from '@lib/firebase'
import { Post } from '@lib/types'
import kebabcase from 'lodash.kebabcase'
import React, { useState } from 'react'

type FormEvent = React.FormEvent<HTMLInputElement>

export const NewPostForm: React.FC = () => {
  const { user } = useAuth()
  const toast = useToast()

  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const slug = encodeURI(kebabcase(title))

  const createPost = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const uid = auth.currentUser?.uid as string
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug)

    const { exists } = await ref.get()

    if (exists) {
      toast({
        title: 'Oops!',
        description: 'You already have a post with that title.',
        isClosable: true,
        position: 'bottom-left'
      })
      setLoading(false)
      return
    }

    const data: Post = {
      blazeCount: 0,
      content: '# hello world!',
      createdAt: serverTimestamp() as Timestamp,
      published: false,
      slug,
      title,
      uid,
      updatedAt: serverTimestamp() as Timestamp,
      username: user?.username as string
    }

    await ref.set(data)

    setLoading(false)
    setTitle('')
  }

  return (
    <FormControl as='form' onSubmit={createPost}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='My New Post!'
        fontWeight='semibold'
        fontSize='lg'
        bg='white'
      />
      <Button
        mt={2}
        colorScheme='whatsapp'
        type='submit'
        isLoading={loading}
        isDisabled={title.length < 3}
      >
        Create New Post
      </Button>
    </FormControl>
  )
}
