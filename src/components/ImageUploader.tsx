import {
  Alert,
  AlertIcon,
  Button,
  Code,
  HStack,
  IconButton,
  Input,
  Progress,
  useToast
} from '@chakra-ui/react'
import { TOAST_SUCCESS } from '@lib/constants'
import { auth, STATE_CHANGED, storage } from '@lib/firebase'
import { sizeInMB } from '@utils/sizeInMB'
import { useColors } from '@utils/useColors'
import { writeToClipboard } from '@utils/writeToClipboard'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi'

export const ImageUploader: React.FC = () => {
  const [url, setURL] = useState('')
  const [progress, setProgress] = useState(0)
  const [markdown, setMarkdown] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [userCopied, setUserCopied] = useState(false)

  const MAX_IMG_SIZE = 20 // mb
  const MAX_IMG_HEIGHT = 2500 // px
  const MAX_IMG_WIDTH = 2500 // px

  const clipboardColor = userCopied ? useColors('green') : useColors('gray')

  const codeHover = useColors('blue')
  const codeBg = useColors('paper')
  const codeBorder = useColors('border')

  const toast = useToast()

  const uploadFile = async (e: FormEvent) => {
    setError('')
    setMarkdown('')
    setURL('')
    setUserCopied(false)

    const el = e.currentTarget as HTMLInputElement
    const file = el.files?.length && el.files[0]

    if (file) {
      // check file extension
      const ext = file && file.type.split('/')[1]
      const re = /(gif|jpe?g|png|gif)$/i
      if (!re.test(ext)) {
        setError('Image file should be of type: jpeg, png, or gif')
        return
      }

      // check raw file size
      if (sizeInMB(file.size) > MAX_IMG_SIZE) {
        setError(`Image file size should be less than ${MAX_IMG_SIZE}mb`)
        return
      }

      // check image dimensions
      let img = new Image()
      img.src = window.URL.createObjectURL(file)

      img.onload = () => {
        if (img.height > MAX_IMG_HEIGHT || img.width > MAX_IMG_WIDTH) {
          setError(
            `Image size should be less than or equal to ${MAX_IMG_WIDTH}x${MAX_IMG_HEIGHT}`
          )
          return
        }
        setUploading(true)

        // make reference to storage bucket location
        const ref = storage.ref(
          `uploads/${auth.currentUser?.uid}/${Date.now()}.${ext}`
        )

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
              setURL(url)
              setUploading(false)
              setProgress(0)
            })
        })
      }
    }
    return
  }

  const copyToClipboard = () => {
    writeToClipboard(markdown)
    toast({
      ...TOAST_SUCCESS,
      title: 'Markdown copied 📄'
    })
    setUserCopied(true)
  }

  // generate markdown when downloadURL is available
  useEffect(() => {
    if (url.length && !markdown.length) {
      setMarkdown(`![alt](${url})`)
      toast({
        ...TOAST_SUCCESS,
        title: 'Image Uploaded'
      })
    }
  }, [url])

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <HStack align='center'>
      {!uploading ? (
        <Button isLoading={uploading} onClick={() => inputRef.current?.click()}>
          <Input
            type='file'
            accept='image/x-png,image/gif,image/jpeg'
            ref={inputRef}
            display='none'
            onChange={uploadFile}
          />
          📸 Upload Image
        </Button>
      ) : (
        <Progress
          borderRadius='md'
          colorScheme='messenger'
          hasStripe
          isAnimated
          transition='ease-in-out .2s'
          value={progress}
          w='full'
          size='md'
        />
      )}
      {error && (
        <Alert status='error' w='max-content' h='10' borderRadius='md'>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {markdown.length && !uploading && (
        <HStack flex='1 1 0%'>
          <Code
            fontSize='xs'
            border='1px solid'
            w='100%'
            d='flex'
            h='10'
            wordBreak='break-all'
            overflow='hidden'
            borderColor={codeBorder}
            borderRadius='base'
            bg={codeBg}
            _hover={{ color: codeHover }}
            onClick={copyToClipboard}
          >
            {markdown}
          </Code>
          <IconButton
            aria-label='Copy image markdown to clipboard'
            onClick={copyToClipboard}
            icon={userCopied ? <HiClipboardCheck /> : <HiClipboard />}
            fontSize='3xl'
            variant='ghost'
            color={clipboardColor}
          />
        </HStack>
      )}
    </HStack>
  )
}
