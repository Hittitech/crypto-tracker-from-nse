import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import stockReducer from "../reducers/stockReducer";

const rootReducer = combineReducers({
  stocks: stockReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
