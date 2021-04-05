import {
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
import { useColors } from '@utils/useColors'
import { writeToClipboard } from '@utils/writeToClipboard'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi'

export const ImageUploader: React.FC = () => {
  const [downloadURL, setDownloadURL] = useState('')
  const [dlProgress, setDlProgress] = useState(0)
  const [imgMarkdown, setImgMarkdown] = useState('')
  const [uploading, setUploading] = useState(false)
  const [userCopied, setUserCopied] = useState(false)

  const clipboardColor = userCopied ? useColors('green') : useColors('gray')
  const imgMarkdownHover = useColors('blue')
  const imgMarkdownBg = useColors('paper')
  const imgMarkdownBorder = useColors('border')

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
      setImgMarkdown('')
      setUserCopied(false)

      // start upload
      const task = ref.put(file)

      // listen to upload task
      task.on(STATE_CHANGED, (snapshot) => {
        const pct = parseInt(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
        )
        setDlProgress(pct)
        // get downloadURL after task resolves (note: this is not a native Promise)
        task
          .then(() => ref.getDownloadURL())
          .then((url) => {
            setDownloadURL(url)
            setUploading(false)
            setDlProgress(0)
          })
      })
    }
  }

  const copyToClipboard = () => {
    writeToClipboard(imgMarkdown)
    toast({
      ...TOAST_SUCCESS,
      title: 'Markdown copied! 📄'
    })
    setDownloadURL('')
    setUserCopied(true)
  }

  // generate markdown when downloadURL is available
  useEffect(() => {
    if (downloadURL.length && !imgMarkdown.length) {
      setImgMarkdown(`![alt](${downloadURL})`)
      toast({
        ...TOAST_SUCCESS,
        title: 'Image Uploaded!'
      })
    }
  }, [downloadURL])

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <HStack align='start'>
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
          borderRadius='base'
          colorScheme='messenger'
          hasStripe
          isAnimated
          transition='ease-in-out .2s'
          value={dlProgress}
          w='full'
          size='sm'
        />
      )}
      {imgMarkdown.length && !uploading && (
        <HStack flex='1 1 0%'>
          <Code
            fontSize='xs'
            border='1px solid'
            w='100%'
            d='flex'
            h='10'
            wordBreak='break-all'
            overflow='hidden'
            borderColor={imgMarkdownBorder}
            borderRadius='base'
            bg={imgMarkdownBg}
            _hover={{ color: imgMarkdownHover }}
            onClick={copyToClipboard}
          >
            {imgMarkdown}
          </Code>
          <IconButton
            aria-label='Copy image markdown to clipboard'
            onClick={copyToClipboard}
            icon={userCopied ? <HiClipboardCheck /> : <HiClipboard />}
            fontSize='3xl'
            variant='unstyled'
            color={clipboardColor}
          />
        </HStack>
      )}
    </HStack>
  )
}
