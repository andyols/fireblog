import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react'
import { TOAST_ERROR } from '@lib/constants'
import { auth, firestore } from '@lib/firebase'
import { errorToast } from '@utils/errorToast'
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
  const toast = useToast()
  const cancelRef = useRef() as RefObject<HTMLButtonElement>

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const deletePost = async () => {
    const ref = firestore
      .collection('users')
      .doc(auth.currentUser?.uid)
      .collection('posts')
      .doc(slug)

    try {
      await ref.delete()
      toast({ ...TOAST_ERROR, title: 'Post annihilated! 💥' })
    } catch (e) {
      console.error(e.message)
      errorToast(e.message)
    }
  }

  return (
    <>
      <Button leftIcon={<FiTrash />} color={useColors('red')} onClick={onOpen}>
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
