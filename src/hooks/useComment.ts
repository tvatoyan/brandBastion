import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchCommentsById, addNewComment, addNewTag } from '../services'
import { Comment, Key } from '../store/types'

export default () => {
  const dispatch = useDispatch<AppDispatch>()
  const comments = useSelector((state: RootState) => state.core.comment.entities)

  const fetchComments = useCallback(
    async (id: number) => {
      return await dispatch(fetchCommentsById(id))
    },
    [dispatch]
  )

  const addComment = useCallback(
    async (comment: Partial<Comment>) => {
      return await dispatch(addNewComment(comment))
    },
    [dispatch]
  )

  const addTags = useCallback(
    async (tags: string[], commentId: Key) => {
      return await dispatch(addNewTag(tags, commentId))
    },
    [dispatch]
  )

  const getListData = useCallback(
    () => {
      return Object.keys(comments).map(key => comments[key])
      },
    [comments]
  )

  return {
    comments,
    getListData,
    fetchComments,
    addComment,
    addTags
  }
}