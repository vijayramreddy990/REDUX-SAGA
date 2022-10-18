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
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserError,
  deleteUserSuccess,
} from "./actions";
import * as types from "./actionTypes";
import { createUserApi, deleteUserApi, loadUsersApi } from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess());
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

//when ever this action tipe is matched it will fire the respective handler
function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  //   yield take(types.DELETE_USER_START, onDeleteUserStartAsync);
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

/*
fork allows you to run some tasks in a parallel fashion.
Forking tasks will make them non-blocking so they will run 
smoothly in the background
*/
const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onDeleteUser)];

/*
A root saga aggregates multiple sagas to a single entry
point for the sagaMiddleware to run.
*/
export default function* rootSaga() {
  yield all([...userSagas]);
}
