import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import dashboardReducer from "../features/dashboardSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  }
});
