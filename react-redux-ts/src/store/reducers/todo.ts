import {
  ActionTypes,
  FetchTodosFailAction,
  FetchTodosSuccessAction,
  DeleteTodoAction
} from '../actions/'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

type TodoActionTypes = FetchTodosFailAction | FetchTodosSuccessAction | DeleteTodoAction

export const todosReducer = (state: Todo[] = [], action: TodoActionTypes) => {
  switch(action.type) {
    case ActionTypes.FETCH_TODOS_SUCCESS:
      return [...state, ...action.todos]
    case ActionTypes.DELETE_TODO:
      return state.filter((todo: Todo) => todo.id !== action.id)
    default:
      return state
  }
}
