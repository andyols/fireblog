import { Button, Text } from '@chakra-ui/react'
import { DocumentReference } from '@firebase/firestore-types'
import { auth, firestore, incremnet } from '@lib/firebase'
import { Post } from '@lib/types'
import { useColors } from '@utils/useColors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'

interface BlazeButtonProps {
  blazeCount?: Post['blazeCount']
  postRef: DocumentReference | null
}

export const BlazeButton: React.FC<BlazeButtonProps> = ({
  postRef,
  blazeCount
}) => {
  const router = useRouter()
  if (!postRef)
    // short circuit component here if postRef doesnt exist
    // this means current user is not authenticated so redirect to login page
    return (
      <Link
        href={`/enter?redirect=/${router.query.username}/${router.query.slug}`}
      >
        <Button
          aria-label='Sign in to like post'
          filter='grayscale(1)'
          fontSize='2xl'
          variant='unstyled'
          _hover={{ textDecor: 'none', filter: 'grayscale(0)' }}
        >
          🔥
        </Button>
      </Link>
    )

  const blazeRef = postRef.collection('blazes').doc(auth.currentUser?.uid)
  const [blazeDoc] = useDocument(blazeRef)
  const userHasBlazed = blazeDoc?.exists

  const addBlaze = async () => {
    const uid = auth.currentUser?.uid

    const batch = firestore.batch()
    batch.update(postRef, { blazeCount: incremnet(1) })
    batch.set(blazeRef, { uid })

    try {
      await batch.commit()
    } catch (e) {
      console.error(e.message)
    }
  }

  const removeBlaze = async () => {
    const batch = firestore.batch()
    batch.update(postRef, { blazeCount: incremnet(-1) })
    batch.delete(blazeRef)

    try {
      await batch.commit()
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <>
      <Button
        aria-label='Like post'
        filter={`grayscale(${userHasBlazed ? '0' : '1'})`}
        fontSize='2xl'
        onClick={() => (userHasBlazed ? removeBlaze() : addBlaze())}
        variant='unstyled'
        _hover={{ textDecor: 'none' }}
      >
        🔥
      </Button>
      <Text fontWeight='semibold' color={useColors('gray')}>
        {blazeCount}
      </Text>
    </>
  )
}
