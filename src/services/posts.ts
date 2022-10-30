import { Post, BackendError } from '../store/types'
import { fetchPostList } from '../store/actions'
import axios from 'axios'
import { AppThunk } from '.'

const baseURL = 'https://jsonplaceholder.typicode.com'
const postsUrl = `${baseURL}/posts`

export const fetchPosts =
  (): AppThunk<Promise<Post[]>> =>
  async (dispatch): Promise<Post[]> => {
    return new Promise<Post[]>(async (resolve, reject) => {
      dispatch(fetchPostList.request())
      try {
        const posts: { data: Post[] } = await axios.get(postsUrl)
        dispatch(fetchPostList.success(posts.data))
        resolve(posts.data)
      } catch (error: any) {
        const backendError: BackendError = { message: error }
        dispatch(fetchPostList.failure(backendError))
        reject(error)
      }
    })
  }