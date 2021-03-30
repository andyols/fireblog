import { Box, Button } from '@chakra-ui/react'
import { DocumentReference } from '@firebase/firestore-types'
import { auth, firestore, incremnet } from '@lib/firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'

interface BlazeButtonProps {
  postRef: DocumentReference | null
}

export const BlazeButton: React.FC<BlazeButtonProps> = ({ postRef }) => {
  const router = useRouter()
  if (!postRef)
    // short circuit component here if postRef doesnt exist
    // this means current user is not authenticated so redirect to login page
    return (
      <Box as='aside' position='sticky' top={8}>
        <Link
          href={`/enter?redirect=/${router.query.username}/${router.query.slug}`}
        >
          <Button
            fontSize='2xl'
            mt={20}
            variant='link'
            aria-label='Sign in to like post'
            _hover={{ textDecor: 'none' }}
            filter='grayscale(1)'
          >
            🔥
          </Button>
        </Link>
      </Box>
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
    <Box as='aside' position='sticky' top={8}>
      <Button
        fontSize='2xl'
        mt={20}
        variant='link'
        aria-label='Like post'
        _hover={{ textDecor: 'none' }}
        filter={`grayscale(${userHasBlazed ? '0' : '1'})`}
        onClick={() => (userHasBlazed ? removeBlaze() : addBlaze())}
      >
        🔥
      </Button>
    </Box>
  )
}
