import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Code,
  HStack
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export const SiteBreadcrumb: React.FC = ({}) => {
  const slug = 'post1'
  const username = 'andyols'

  return (
    <HStack placeSelf='center'>
      <Breadcrumb as={Code}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/enter'>
            Enter
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href='/admin'>
            My Posts
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={`/admin/${slug}`}>
            Edit Post
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={`/${username}`}>
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={`/${username}/${slug}`}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </HStack>
  )
}
