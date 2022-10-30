import { createAsyncAction } from 'typesafe-actions'
import * as CoreActionTypes from '../constants/post'
import { BackendError, Post } from '../types'

export const fetchPostList = createAsyncAction(
    CoreActionTypes.FetchPostListRequest,
    CoreActionTypes.FetchPostListSuccess,
    CoreActionTypes.FetchPostListError
  )<undefined, Post[], BackendError>()

