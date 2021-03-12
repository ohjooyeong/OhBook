import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Reducer from "./_reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <Provider
            store={createStoreWithMiddleware(
                Reducer,
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )}
        >
            <App />
        </Provider>
    </AlertProvider>,
    document.getElementById("root")
);
serviceWorker.unregister();
