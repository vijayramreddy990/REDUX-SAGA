import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import rootSaga from "./usersaga";

const sageMiddleware = createSagaMiddleware();

const middlewares = [sageMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sageMiddleware.run(rootSaga);
export default store;
