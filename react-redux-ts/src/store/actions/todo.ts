import { ActionTypes, DeleteTodoAction } from './actionTypes'
import { Todo } from '../reducers/todo'

const fetchTodos = () => ({
  type: ActionTypes.FETCH_TODOS
})

const fetchTodosFail = (error: string) => ({
  type: ActionTypes.FETCH_TODOS_FAIL,
  error
})

const fetchTodosSuccess = (todos: Todo[]) => ({
  type: ActionTypes.FETCH_TODOS_SUCCESS,
  todos
})

const deleteTodo = (id: number) => ({
  type: ActionTypes.DELETE_TODO,
  id
})

export { fetchTodos, deleteTodo, fetchTodosFail, fetchTodosSuccess }