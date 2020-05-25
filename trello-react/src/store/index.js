import { createStore } from "redux";
import combinedReducers from "../reducers";

const store = createStore(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

export default store;
