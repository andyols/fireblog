import { DocumentSnapshot, Timestamp } from '@firebase/firestore-types'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { Post } from './types'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// auth
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
})
export const githubAuthProvider = new firebase.auth.GithubAuthProvider()

// firestore
export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const incremnet = firebase.firestore.FieldValue.increment

// storage
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED

// Helper Functions
/**
 * Gets a users/{uid} document with username
 * @param username
 * @returns the user document in a promise
 */
export const getUserWithUsername = async (username: string) => {
  const usersRef = firestore.collection('users')
  const query = usersRef.where('username', '==', username).limit(1)
  const userDoc = (await query.get()).docs[0]
  return userDoc
}

/**
 * Converts a firestore document to JSON
 * @param doc
 */
export const postToJSON = (doc: DocumentSnapshot) => {
  const data = doc.data()

  if (!data) return null

  return {
    ...(data as Post),
    createdAt: data.createdAt.toMillis() as string,
    updatedAt: data.createdAt.toMillis() as string
  }
}

/**
 * Ensures a given timestamp is a firestore Timestamp
 * @param timestamp
 */
export const convertTimestamp = (timestamp: number | Timestamp) => {
  return typeof timestamp === 'number'
    ? firebase.firestore.Timestamp.fromMillis(timestamp)
    : timestamp
}

/**
 * Converts a given timestamp to a JavaScript date
 * @param timestamp
 */
export const timestampToDate = (timestamp: number | Timestamp) => {
  return typeof timestamp === 'number'
    ? new Date(timestamp)
    : timestamp.toDate()
}
