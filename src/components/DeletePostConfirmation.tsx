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
import { auth, firestore } from '@lib/firebase'
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

  const onDelete = async () => {
    const ref = firestore
      .collection('users')
      .doc(auth.currentUser?.uid)
      .collection('posts')
      .doc(slug)

    await ref.delete()
    toast({
      status: 'error',
      title: 'Post annhilated! 💥',
      isClosable: true,
      position: 'bottom-left'
    })
    onClose()
  }

  return (
    <>
      <Button leftIcon={<FiTrash />} color='red.500' onClick={onOpen}>
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
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Yep, do it! 💣
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
