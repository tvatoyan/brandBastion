import { Key, BackendObject, ResourceState } from './index'

export type PostID = Key

export interface Post extends BackendObject {
    userId: number,
    title: string,
    body: string
}

export type PostState = ResourceState<PostID, Post>