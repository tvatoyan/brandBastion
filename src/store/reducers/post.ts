import { Reducer } from 'redux'
import * as CoreActionTypes from '../constants'
import { PostID, Post, PostState } from '../types'
import { ActionTypes } from '../actions'
import { initResource, handleResourceRequest, handleResourceFetchSuccess, handleResourceError } from '../utils'

const initialState: PostState = {
  ...initResource<PostID, Post>(),
}

const reducer: Reducer<PostState> = (state = initialState, action: ActionTypes): PostState => {
  switch (action.type) {
    case CoreActionTypes.FetchPostListRequest:
      return handleResourceRequest<Post, PostID, PostState>(state)
    case CoreActionTypes.FetchPostListSuccess:
      return handleResourceFetchSuccess<Post, PostID, PostState, ActionTypes>(state, action)
    case CoreActionTypes.FetchPostListError:
        return handleResourceError<Post, PostID, PostState, ActionTypes>(state, action)
    default:
      return { ...state }
  }
}

export { reducer as PostReducer }