import {
  Button,
  CircularProgress,
  Code,
  Input,
  useToast
} from '@chakra-ui/react'
import { TOAST_SUCCESS } from '@lib/constants'
import { auth, STATE_CHANGED, storage } from '@lib/firebase'
import { useColors } from '@utils/useColors'
import { writeToClipboard } from '@utils/writeToClipboard'
import React, { FormEvent, useEffect, useRef, useState } from 'react'

export const ImageUploader: React.FC = () => {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')
  const [imgMarkdown, setImgMarkdown] = useState('')
  const toast = useToast()

  const uploadFile = async (e: FormEvent) => {
    const el = e.currentTarget as HTMLInputElement
    const file = el.files?.length && el.files[0]

    if (file) {
      const ext = file && file.type.split('/')[1]

      // make reference to storage bucket location
      const ref = storage.ref(
        `uploads/${auth.currentUser?.uid}/${Date.now()}.${ext}`
      )
      setUploading(true)

      // start upload
      const task = ref.put(file)

      // listen to upload task
      task.on(STATE_CHANGED, (snapshot) => {
        const pct = parseInt(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
        )
        setProgress(pct)

        // get downloadURL after task resolves (note: this is not a native Promise)
        task
          .then(() => ref.getDownloadURL())
          .then((url) => {
            setDownloadURL(url)
            setUploaded(true)
            setUploading(false)
          })
      })
    }
  }

  useEffect(() => {
    if (downloadURL.length && !imgMarkdown.length) {
      setImgMarkdown(`![alt](${downloadURL})`)
      toast({
        ...TOAST_SUCCESS,
        title: 'Image uploaded!',
        description: 'Click the generated markdown to copy to clipboard. '
      })
    }
  }, [downloadURL, imgMarkdown])

  const inputRef = useRef<HTMLInputElement>(null)

  return uploading ? (
    <CircularProgress value={progress} />
  ) : (
    <>
      {imgMarkdown && (
        <Code
          fontSize='xs'
          py={2}
          px={3}
          w='min-content'
          border='1px solid'
          borderColor={useColors('border')}
          borderRadius='base'
          cursor='pointer'
          transition='ease-in-out 0.2s'
          userSelect='none'
          bg={useColors('paper')}
          _hover={{ color: useColors('blue') }}
          onClick={() => {
            writeToClipboard(imgMarkdown)
            toast({
              ...TOAST_SUCCESS,
              title: 'Markdown copied! 📄'
            })
            setDownloadURL('')
            setImgMarkdown('')
            setUploaded(false)
          }}
        >
          {imgMarkdown}
        </Code>
      )}
      {!uploaded && (
        <Button placeSelf='start' onClick={() => inputRef.current?.click()}>
          <Input
            type='file'
            accept='image/x-png,image/gif,image/jpeg'
            ref={inputRef}
            placeholder='Your image...'
            display='none'
            onChange={uploadFile}
          />
          📸 Upload Image
        </Button>
      )}
    </>
  )
}
