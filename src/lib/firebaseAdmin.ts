import * as firebaseAdmin from 'firebase-admin'

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY as string
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL as string
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID as string

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey.replace(/\\n/g, '\n'),
      clientEmail,
      projectId
    }),
    databaseURL: `https://${projectId}.firebaseio.com`
  })
}

export const adminAuth = firebaseAdmin.auth()
