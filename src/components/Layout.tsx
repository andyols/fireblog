import { Flex } from '@chakra-ui/react'
import { useColors } from '@utils/useColors'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { Navbar } from './Navbar'
import {
  Wrapper,
  WrapperJustify,
  WrapperVariant,
  WrapperWidth
} from './Wrapper'

export type TMeta = {
  title?: string
  description?: string
  type?: string
  image?: string
  date?: string
}

interface LayoutProps extends TMeta {
  width?: WrapperWidth
  justify?: WrapperJustify
  variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({
  width,
  children,
  justify,
  variant,
  ...customMeta
}) => {
  const router = useRouter()
  const rootURL = 'https://fireblogg.vercel.app'

  const meta = {
    title: 'A Social Blogging Platform',
    description:
      'A social blogging platform inspired by sites like DEV.to and Medium. Read, write and share your thoughts and ideas. Fast. Simple. Fun.',
    type: 'website',
    image: `${rootURL}/static/images/card.png`,
    ...customMeta
  } as TMeta

  const background = useColors('background')

  return (
    <Flex flexDir='column' minH='100vh' bg={background}>
      <Head>
        <title>{`Fireblog | ${meta.title}`}</title>
        <meta name='description' content={meta.description} />

        <meta name='robots' content='follow, index' />

        <link rel='canonical' href={`${rootURL}${router.asPath}`} />

        <meta property='og:url' content={`${rootURL}${router.asPath}`} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content={meta.title?.split(' ')[0]} />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:image' content={meta.image} />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@andyols_dev' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />

        {meta.date && (
          <meta property='article:published_time' content={meta.date} />
        )}
      </Head>
      <Navbar />
      <Wrapper width={width} justify={justify} variant={variant}>
        {children}
      </Wrapper>
    </Flex>
  )
}
