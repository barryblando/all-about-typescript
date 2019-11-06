import { put, call } from 'redux-saga/effects'
import axios from '../../axios-instance'

import { fetchTodosSuccess } from '../actions/'

function* fetchTodosSaga() {
  try {
    const response = yield call(axios.get, '/todos')
    console.log(response.data)
    yield put(fetchTodosSuccess(response.data))
  } catch (err) {
    // yield put(actions.fetchTodosFail(err))
    yield console.log(err)
  }
}

export { fetchTodosSaga }