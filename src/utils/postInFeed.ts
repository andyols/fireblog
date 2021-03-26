import { Post } from '@lib/types'

/**
 * Checks if a given Post is in the give Post[]
 * @param post
 * @param feed
 * @returns
 */
export const postInFeed = (post: Post, feed: Post[]) => {
  return feed.some((p) => post.slug === p.slug)
}
