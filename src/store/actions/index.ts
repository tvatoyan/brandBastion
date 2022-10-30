import { ActionType } from 'typesafe-actions'
import { fetchPostList } from './post'
import { fetchCommentList, addComment, addTag } from './comment'

type FetchPostList = ActionType<typeof fetchPostList>
type FetchCommentList = ActionType<typeof fetchCommentList>
type AddComment = ActionType<typeof addComment>
type AddTag = ActionType<typeof addTag>

export type ActionTypes = FetchPostList | FetchCommentList | AddComment | AddTag

export { 
    fetchPostList,
    fetchCommentList,
    addComment,
    addTag
}