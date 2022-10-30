import { createAsyncAction } from 'typesafe-actions'
import * as CoreActionTypes from '../constants'
import { BackendError, Comment, Key } from '../types'

export const fetchCommentList = createAsyncAction(
    CoreActionTypes.FetchCommentListRequest,
    CoreActionTypes.FetchCommentListSuccess,
    CoreActionTypes.FetchCommentListError
  )<undefined, Comment[], BackendError>()

  export const addComment = createAsyncAction(
    CoreActionTypes.AddCommentRequest,
    CoreActionTypes.AddCommentSuccess,
    CoreActionTypes.AddCommentError
  )<undefined, Comment, BackendError>()

  export const addTag = createAsyncAction(
    CoreActionTypes.AddTagRequest,
    CoreActionTypes.AddTagSuccess,
    CoreActionTypes.AddTagError
  )<undefined, { data: Comment, commentId: Key }, BackendError>()