import { Spinner } from '@chakra-ui/react'
import React from 'react'

export const Loader: React.FC = () => {
  return <Spinner size='xl' thickness='5px' speed='0.5s' placeSelf='center' />
}
