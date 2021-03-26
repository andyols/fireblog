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
  displayName: string
  photoURL: string
  username: string
}
