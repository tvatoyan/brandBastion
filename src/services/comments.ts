import { Comment, BackendError } from '../store/types'
import { fetchCommentList, addComment, addTag } from '../store/actions'
import axios from 'axios'
import { Key } from '../store/types'
import { AppThunk } from '.'

const baseURL = 'https://jsonplaceholder.typicode.com'
const getCommentUrl = (id: number) => `${baseURL}/posts/${id}/comments`
const getTagUrl = (id: Key) => `${baseURL}/comments/${id}`
const postUrl = `${baseURL}/comments`

  export const fetchCommentsById =
  (id: number): AppThunk<Promise<Comment[]>> =>
  async (dispatch): Promise<Comment[]> => {
    return new Promise<Comment[]>(async (resolve, reject) => {
      dispatch(fetchCommentList.request())
      try {
        const posts: { data: Comment[] } = await axios.get(getCommentUrl(id))
        dispatch(fetchCommentList.success(posts.data))
        resolve(posts.data)
      } catch (error: any) {
        const backendError: BackendError = { message: error }
        dispatch(fetchCommentList.failure(backendError))
        reject(error)
      }
    })
  }

  export const addNewComment =
  (comment: Partial<Comment>): AppThunk<Promise<Comment>> =>
  async (dispatch): Promise<Comment> => {
    return new Promise<Comment>(async (resolve, reject) => {
      dispatch(addComment.request())
      try {
        const response: { data: Comment } = await axios.post(postUrl, comment)
        dispatch(addComment.success(response.data))
        resolve(response.data)
      } catch (error: any) {
        const backendError: BackendError = { message: error }
        dispatch(addComment.failure(backendError))
        reject(error)
      }
    })
  }

  export const addNewTag =
  (tags: string[], commentId: Key): AppThunk<Promise<Comment>> =>
  async (dispatch): Promise<Comment> => {
    return new Promise<Comment>(async (resolve, reject) => {
      dispatch(addTag.request())
      try {
        const response: { data: Comment } = await axios.patch(getTagUrl(commentId), { tags })
        dispatch(addTag.success({ data: response.data, commentId }))
        resolve(response.data)
      } catch (error: any) {
        const backendError: BackendError = { message: error }
        dispatch(addTag.failure(backendError))
        reject(error)
      }
    })
  }