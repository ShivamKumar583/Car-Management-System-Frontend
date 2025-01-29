import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../slices/carSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    user:userReducer
  },
});
