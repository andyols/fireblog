import { Timestamp } from '@firebase/firestore-types'

export type Post = {
  blazeCount: number
  content: string
  createdAt: number | Timestamp
  slug: string
  title: string
  username: string
}

export type User = {
  uid: string | undefined
  displayName: string | null | undefined
  photoURL: string | null | undefined
  username: string | null | undefined
}
