// all CRUD operations will be performed in this file itself
import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import { loadUsersSuccess, loadUsersError } from "./actions";
import * as types from "./actionTypes";
import { loadUsersApi } from "./api";

export function* onLoadUsersStartAsync() {}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

/*
fork allows you to run some tasks in a parallel fashion.
Forking tasks will make them non-blocking so they will run 
smoothly in the background
*/
const userSagas = [fork(onLoadUsers)];

/*
A root saga aggregates multiple sagas to a single entry
point for the sagaMiddleware to run.
*/
export default function* rootSaga() {
  yield all([...userSagas]);
}
