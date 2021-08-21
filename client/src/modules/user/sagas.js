import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  getAuthenticationAPI,
  postLoginAPI,
  postSignupAPI,
} from "../../api/user";
import {
  AUTH_VERIFY_REQUEST,
  AUTH_VERIFY_SUCCESS,
  AUTH_VERIFY_FAILURE,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "./types";

function* login(action) {
  try {
    const result = yield call(postLoginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function* signup(action) {
  try {
    const result = yield call(postSignupAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function* logout() {
  try {
    yield call(postLoginAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* auth() {
  try {
    const result = yield call(getAuthenticationAPI);
    yield put({
      type: AUTH_VERIFY_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: AUTH_VERIFY_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, signup);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, logout);
}

function* watchAuth() {
  yield takeLatest(AUTH_VERIFY_REQUEST, auth);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchAuth),
  ]);
}
