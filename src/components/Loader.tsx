import { Spinner } from '@chakra-ui/react'
import React from 'react'

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Loader: React.FC<LoaderProps> = ({ size = 'xl' }) => {
  return <Spinner size={size} thickness='5px' speed='0.5s' placeSelf='center' />
}
