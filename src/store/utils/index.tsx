import { ResourceStatus, Key, EntityMap, BackendObject, ResourceState } from '../types'
import { AnyAction } from 'redux'

export const initResource = <K extends Key, T>() => ({
    status: 'idle' as ResourceStatus,
    entities: {} as EntityMap<K, T>,
    keys: [] as K[],
    selected: null,
    error: null,
  })

  export const handleResourceRequest = <R extends BackendObject, K extends Key, S extends ResourceState<K, R>>(
    state: S
  ): S => ({
    ...state,
    status: 'busy',
  })

  export const handleResourceError = <
    R extends BackendObject,
    K extends Key,
    S extends ResourceState<K, R>,
    A extends AnyAction
  >(
    state: S,
    action: A
  ): S => ({ ...state, status: 'idle', error: action.payload })

  export const handleResourceFetchSuccess = <
    R extends BackendObject,
    K extends Key,
    S extends ResourceState<K, R>,
    A extends AnyAction
  >(state: S, action: A) => {
    const newEntities = arrayToMap<R>(action.payload)

    return {
      ...state,
      entities: { ...newEntities },
      keys: Array.from(new Set([...state.keys, ...action.payload.map((r: R) => r.id)])),
      status: 'idle',
    }
  }

/**
 * @description Converts a list of objects with unique IDs to a map
 * @param array List of objects with an ID
 * @returns Map of objects and their respective IDs
 */
export function arrayToMap<T extends BackendObject>(array: T[]) {
  return array.reduce(
    (memo: { [key: string]: T }, item: T) => ({
      ...memo,
      [item.id]: item,
    }),
    {}
  )
}