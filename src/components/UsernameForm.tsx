import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'
import { useAuth } from '@lib/auth'
import { firestore } from '@lib/firebase'
import { useColors } from '@utils/useColors'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useState } from 'react'

type FormEvent = React.FormEvent<HTMLInputElement>

export const UsernameForm: React.FC = () => {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`)
        const { exists } = await ref.get()
        console.log('Firestore read executed! 🔥')
        setIsValid(!exists)
        setLoading(false)
      }
    }, 500),
    []
  )

  const onChange = (e: FormEvent) => {
    const val = e.currentTarget.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (user) {
      const userDoc = firestore.doc(`users/${user.uid}`)
      const usernameDoc = firestore.doc(`usernames/${formValue}`)

      const batch = firestore.batch()
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName || 'Anonymous User'
      })
      batch.set(usernameDoc, { uid: user.uid })

      try {
        await batch.commit()
      } catch (e) {
        console.error(e.message)
      }
    }
  }

  return user?.username ? null : (
    <Stack w='full' spacing={4}>
      <FormControl as='form' onSubmit={onSubmit}>
        <FormLabel>Choose a Username</FormLabel>
        <Input
          name='username'
          bg={useColors('paper')}
          borderColor={useColors('border')}
          placeholder='username'
          value={formValue}
          onChange={onChange}
        />
        <FormHelperText
          color={
            isValid
              ? useColors('green')
              : loading
              ? useColors('gray')
              : useColors('red')
          }
        >
          {loading
            ? 'Checking username...'
            : isValid
            ? `${formValue} is available!`
            : formValue.length >= 3
            ? `${formValue} is taken.`
            : ''}
        </FormHelperText>
        <Button mt={4} type='submit' colorScheme='whatsapp' disabled={!isValid}>
          Choose {formValue}
        </Button>
      </FormControl>
    </Stack>
  )
}
