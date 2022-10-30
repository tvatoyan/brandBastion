export * from './post'
export * from './comment'

export type Key = string | number

export type Maybe<T> = T | null

export type BackendObject = {
    readonly id: Key
}

/**
 * @description Status of resource network state
 */
 export type ResourceStatus = 'idle' | 'busy'

// this is the interface for representing errors from the backend
export interface BackendError {
    code?: number | string
    message: string
}

/**
 * @description Base type for managing an object map with a pre-defined key
 * @example
 * type SomeObjectID = string
 * const entities = EntityMap<SomeObjectID, SomeObject>
 */
 export type EntityMap<K extends Key, T> = { [key in K]: T }

 /**
 * @description Interface template to manage state of a backend RESTful resource
 */
export interface ResourceState<K extends Key, R extends BackendObject> {
    status: ResourceStatus
    entities: EntityMap<K, R>
    keys: K[]
    selected: Maybe<K>
    error: Maybe<BackendError>
  }