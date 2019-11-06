import { Todo } from "../reducers/todo"

// The only requirement of a type in redux action is that it must be some unique value
export enum ActionTypes {
  // When you're using redux-thunk you don't need need to explicitly put value, typescript will put it by default to make it unique
  // But for redux-saga, saga watchers/listeners doesn't recognize number provided by default by ts, so I explicitly put the value
  FETCH_TODOS = "FETCH_TODOS", 
  FETCH_TODOS_FAIL = "FETCH_TODOS_FAIL",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  DELETE_TODO = "DELETE_TODO"
}

export interface FetchTodosFailAction {
  type: ActionTypes.FETCH_TODOS // if we use const with value "FETCH_TODOS", we can make it as literal type using typeof
  error: string
}

export interface FetchTodosSuccessAction {
  type: ActionTypes.FETCH_TODOS_SUCCESS
  todos: Todo[]
}

export interface DeleteTodoAction {
  type: ActionTypes.DELETE_TODO,
  id: number
}
