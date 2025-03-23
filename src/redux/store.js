import { configureStore } from "@reduxjs/toolkit";
import { quizReducer } from "./slice.js";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
