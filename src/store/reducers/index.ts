import { combineReducers } from 'redux'
import { PostReducer } from './post'
import { CommentReducer } from './comment'

export const CoreReducer = combineReducers({
  post: PostReducer,
  comment: CommentReducer
})
