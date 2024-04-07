import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Import redux-thunk

import authReducer from "./auth/reducer";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware: [...getDefaultMiddleware(), thunk],
});
