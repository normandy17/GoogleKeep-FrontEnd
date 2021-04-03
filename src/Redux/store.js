import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./user/reducer";
import { searchReducer } from "./Search/reducer";
import { themeReducer } from "./uiRedux/reducer";
import { tasksReducer } from "./taskRedux/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({  
  auth: authReducer,
  search: searchReducer,
  theme:themeReducer,
  tasks:tasksReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
