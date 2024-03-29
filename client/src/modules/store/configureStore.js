import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import "redux";

import rootReducer, { rootSaga } from "..";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, logger];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(sagaMiddleware))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}
