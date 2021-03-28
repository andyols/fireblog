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
  try {
    const cookies = nookies.get(ctx)
    const token = await adminAuth.verifyIdToken(cookies.token)

    return (
      token && {
        props: {}
      }
    )
  } catch (e) {
    // token error so redirect to enter page
    ctx.res.writeHead(302, { location: `/enter?redirect=${ctx.resolvedUrl}` })
    ctx.res.end()

    return { props: {} as never }
  }
}
