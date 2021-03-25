import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Code,
  HStack
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export const SiteBreadcrumb: React.FC = () => {
  const slug = 'post1'
  const username = 'andyols'

  return (
    <HStack placeSelf='center'>
      <Breadcrumb as={Code}>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href='/enter'>Enter</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href='/admin'>Admin Posts</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={`/admin/${slug}`}>Admin Post Edit</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={`/${username}`}>User Profile</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={`/${username}/${slug}`}>Post</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </HStack>
  )
}
