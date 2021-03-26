import Head from 'next/head'
import React from 'react'

interface HeadProps {
  pageTitle: string
}

export const PageHead: React.FC<HeadProps> = ({ pageTitle }) => {
  return (
    <Head>
      <title>Fireblog | {pageTitle}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
