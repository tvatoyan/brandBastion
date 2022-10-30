import { Reducer } from 'redux'
import * as CoreActionTypes from '../constants'
import { CommentID, Comment, CommentState } from '../types'
import { ActionTypes } from '../actions'
import { initResource, handleResourceRequest, handleResourceFetchSuccess, handleResourceError } from '../utils'

const initialState: CommentState = {
  ...initResource<CommentID, Comment>(),
}

const reducer: Reducer<CommentState> = (state = initialState, action: ActionTypes): CommentState => {
  switch (action.type) {
    case CoreActionTypes.FetchCommentListRequest:
      return handleResourceRequest<Comment, CommentID, CommentState>(state)
    case CoreActionTypes.FetchCommentListSuccess:
      return handleResourceFetchSuccess<Comment, CommentID, CommentState, ActionTypes>(state, action)
    case CoreActionTypes.FetchCommentListError:
        return handleResourceError<Comment, CommentID, CommentState, ActionTypes>(state, action)
    case CoreActionTypes.AddCommentRequest:
      return handleResourceRequest<Comment, CommentID, CommentState>(state)
    case CoreActionTypes.AddCommentError:
      return handleResourceError<Comment, CommentID, CommentState, ActionTypes>(state, action)
    case CoreActionTypes.AddCommentSuccess:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...{ [action.payload.id]: action.payload },
        },
        keys: Array.from(new Set([...state.keys, action.payload.id])),
        status: 'idle',
      }
    case CoreActionTypes.AddTagRequest:
      return handleResourceRequest<Comment, CommentID, CommentState>(state)
    case CoreActionTypes.AddTagError:
      return handleResourceError<Comment, CommentID, CommentState, ActionTypes>(state, action)
    case CoreActionTypes.AddTagSuccess:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...{ [action.payload.commentId]: action.payload.data },
        },
        status: 'idle',
      }
    default:
      return { ...state }
  }
}

export { reducer as CommentReducer }
