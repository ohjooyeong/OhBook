import produce from "immer";
import {
  AUTH_VERIFY_FAILURE,
  AUTH_VERIFY_REQUEST,
  AUTH_VERIFY_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "./types";

const initialState = {
  me: null,
  userLoginInfo: { loading: false, error: null, data: null },
  userSignupInfo: { loading: false, error: null },
  userLogoutInfo: { loading: false, error: null },
  userAuthInfo: { loading: false, error: null },
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.userLoginInfo.loading = true;
        draft.userLoginInfo.error = null;
        break;
      case LOG_IN_SUCCESS:
        draft.userLoginInfo.loading = false;
        draft.userLoginInfo.data = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.userLoginInfo.loading = false;
        draft.userLoginInfo.error = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.userSignupInfo.loading = true;
        draft.userSignupInfo.error = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.userSignupInfo.loading = false;
        break;
      case SIGN_UP_FAILURE:
        draft.userSignupInfo.loading = false;
        draft.userSignupInfo.error = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.userLogoutInfo.loading = true;
        draft.userLogoutInfo.error = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.userLogoutInfo.loading = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.userLogoutInfo.loading = false;
        draft.userLogoutInfo.error = action.error;
        break;
      case AUTH_VERIFY_REQUEST:
        draft.userAuthInfo.loading = true;
        draft.userAuthInfo.error = null;
        break;
      case AUTH_VERIFY_SUCCESS:
        draft.userAuthInfo.loading = false;
        draft.me = action.data;
        break;
      case AUTH_VERIFY_FAILURE:
        draft.userAuthInfo.loading = false;
        draft.userAuthInfo.error = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
