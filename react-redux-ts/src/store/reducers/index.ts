import { combineReducers } from 'redux'
import { todosReducer, Todo } from './todo'

export interface StoreState {
  todos: Todo[]
}

const rootReducers = combineReducers<StoreState>({
  todos: todosReducer
})

export { rootReducers }