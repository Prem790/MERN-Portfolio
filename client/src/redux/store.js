import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";

// Redux Toolkit's configureStore handles combining reducers for us,
// so the legacy `redux` package and combineReducers are no longer needed.
const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

export default store;
