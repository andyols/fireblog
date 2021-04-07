import { Text } from '@chakra-ui/react'
import { auth, firestore } from '@lib/firebase'
import { Feed } from '@lib/types'
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

  if (loading) return <Loader />

  const posts = querySnapshot?.docs.map((doc) => doc.data()) as Feed
  const userHasPosts = posts?.length

  return (
    <>
      {userHasPosts ? (
        <PostFeed posts={posts} admin />
      ) : (
        <Text pb={2}>
          You currently have no posts. Use the form below to get started!
        </Text>
      )}

      <NewPostForm />
    </>
  )
}
