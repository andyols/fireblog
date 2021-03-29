import { adminAuth } from '@lib/firebaseAdmin'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'

export type GuardedProps = InferGetServerSidePropsType<typeof Gatekeeper>

/**
 * Ensures that a user JWT exists within Next context and is verified with firebase.
 * Will handle programmattic redirects to and from login page and origin page.
 * @param ctx
 * @returns props object only if the token passed verification
 */
export const Gatekeeper = async (ctx: GetServerSidePropsContext) => {
  // attempt to verify cookie token
  try {
    const cookies = nookies.get(ctx)
    await adminAuth.verifyIdToken(cookies.token)

    // token is good, good to fetch data and do auth stuff

    return { props: {} }
  } catch (e) {
    // token error so redirect to enter page
    return {
      redirect: {
        permanent: false,
        destination: `/enter?redirect=${ctx.resolvedUrl}`
      },
      props: {} as never
    }
  }
}
