import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// TODO: Import Sagas & Reducers
import { rootReducers } from './reducers' 
import { rootSaga } from './sagas'

// TODO: Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const configureStore = createStore(rootReducers, applyMiddleware(sagaMiddleware));

// run watchers and listen
sagaMiddleware.run(rootSaga);

export default configureStore