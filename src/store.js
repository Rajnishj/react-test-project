import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./redux/index";

export const store = createStore(rootReducer, composeWithDevTools());
