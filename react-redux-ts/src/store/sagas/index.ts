import { takeEvery, takeLatest, all, fork } from 'redux-saga/effects';

import { ActionTypes } from '../actions/actionTypes'
import { fetchTodosSaga } from './todo'

function* watchTodos() {
  yield all([
    takeEvery(ActionTypes.FETCH_TODOS, fetchTodosSaga)
  ])
}

function* rootSaga() {
  yield all([fork(watchTodos)])
}

export { rootSaga }