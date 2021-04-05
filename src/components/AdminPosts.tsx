import { Heading } from '@chakra-ui/react'
import { auth, firestore } from '@lib/firebase'
import { Post } from '@lib/types'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Loader } from './Loader'
import { NewPostForm } from './NewPostForm'
import { PostFeed } from './PostFeed'

interface AdminPostsProps {}

export const AdminPosts: React.FC<AdminPostsProps> = ({}) => {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
  const query = ref.orderBy('createdAt')
  const [querySnapshot, loading] = useCollection(query)

  const posts = querySnapshot?.docs.map((doc) => doc.data()) as Post[]

  return (
    <>
      <Heading fontSize={['2xl', '3xl']}>My Posts</Heading>
      {loading ? <Loader /> : <PostFeed posts={posts} admin />}
      <NewPostForm />
    </>
  )
}
