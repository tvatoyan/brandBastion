import { applyMiddleware, combineReducers, createStore, AnyAction } from 'redux'
import { createBrowserHistory } from 'history'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { CoreReducer } from './reducers'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
    router: connectRouter(history),
    core: CoreReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)))
}
