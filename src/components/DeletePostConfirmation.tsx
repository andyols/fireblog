import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import { auth, firestore, storage } from '@lib/firebase'
import { errorToast } from '@utils/errorToast'
import { firebaseErrorToast } from '@utils/firebaseErrorToast'
import { useColors } from '@utils/useColors'
import React, { RefObject, useRef, useState } from 'react'
import { FiTrash } from 'react-icons/fi'

interface DeletePostConfirmationProps {
  slug: string
}

export const DeletePostConfirmation: React.FC<DeletePostConfirmationProps> = ({
  slug
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const trashColor = useColors('red')
  const cancelRef = useRef() as RefObject<HTMLButtonElement>

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const deletePost = async () => {
    const postRef = firestore
      .collection('users')
      .doc(auth.currentUser?.uid)
      .collection('posts')
      .doc(slug)

    const postBlazesRef = postRef.collection('blazes')
    const postImagesRef = postRef.collection('images')

    const batch = firestore.batch()
    try {
      batch.delete(postRef)

      // add all images to batch delete if there are any
      if (postImagesRef) {
        const snapshot = await postImagesRef.get()

        snapshot.docs.forEach(async (doc) => {
          batch.delete(doc.ref)

          // try to delete image from storage using the image document's path field value
          const storageRef = storage.ref(doc.data().path)
          try {
            await storageRef.delete()
          } catch (e) {
            console.error(e.message)
          }
        })
      }

      // add all blazes to batch delete if there are any
      if (postBlazesRef) {
        const snapshot = await postBlazesRef.get()
        snapshot.docs.forEach((doc) => batch.delete(doc.ref))
      }

      // try commit this behemoth of a deletion
      await batch.commit()
      errorToast('Post annihilated! 💥')
    } catch (e) {
      console.error(e.message)
      firebaseErrorToast(e.message, e.code)
    }
  }

  return (
    <>
      <Button
        leftIcon={<FiTrash />}
        color={trashColor}
        onClick={onOpen}
        size='sm'
        fontSize='md'
      >
        Delete
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post?
            </AlertDialogHeader>

            <AlertDialogBody mt={-4}>
              Are you sure? This action is permanent.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Never mind
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onClose()
                  deletePost()
                }}
                ml={3}
              >
                Yep, do it! 💣
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
