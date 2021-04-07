import { adminAuth } from '@lib/firebaseAdmin'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'

export type GuardedProps = InferGetServerSidePropsType<
  typeof getServerSideAuthProps
>

/**
 * Ensures that a user JWT exists within Next context and is verified with firebase.
 * Will handle programmattic redirects to and from login page and origin page.
 * @param ctx
 * @returns props object only if the token passed verification
 */
export const getServerSideAuthProps = async (
  ctx: GetServerSidePropsContext
) => {
  // attempt to verify cookie token
  let user = null
  try {
    const cookies = nookies.get(ctx)
    user = await adminAuth.verifyIdToken(cookies.token)

    // token is good, return some user related props
    const name =
      user.provider_id === 'anonymous'
        ? 'Anonymous User'
        : (user.name.split(' ')[0] as string)

    return { props: { name } }
  } catch (e) {
    // token error
    return {
      redirect: {
        permanent: false,
        destination: `/enter?redirect=${ctx.resolvedUrl}`
      },
      props: {} as never
    }
  }
}
