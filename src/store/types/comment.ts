import { Key, BackendObject, ResourceState } from './index'

export type CommentID = Key

export interface Comment extends BackendObject {
    postId: number,
    name: string,
    email: string,
    body: string,
    tags?: string[]
}

export type CommentState = ResourceState<CommentID, Comment>