import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import user from "./user";
import userSaga from "./user/sagas";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;

export function* rootSaga() {
  yield all([userSaga()]);
}
