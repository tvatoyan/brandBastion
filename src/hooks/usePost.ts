import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchPosts as fetchPostsService } from '../services'

export default () => {
  const [filter, setFilter] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector((state: RootState) => state.core.post.entities)

  const fetchPosts = useCallback(
    async () => {
      return await dispatch(fetchPostsService())
    },
    [dispatch]
  )

  const getListData = useCallback(
    () => {
      if (filter) {
        return Object.keys(posts)
          .filter(key => posts[key].title.includes(filter))
          .map(key => posts[key])
       } else {
        return Object.keys(posts).map(key => posts[key])
      }
    },
    [filter, posts]
  )

  return {
    posts,
    setFilter,
    getListData,
    fetchPosts
  }
}
