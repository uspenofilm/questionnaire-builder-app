import { createSlice } from "@reduxjs/toolkit";
import { fetchQuiz, addQuiz, deleteQuiz } from "./operations.js";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    items: { quiz: [], page: 1, totalQuiz: 0, totalPages: 1 },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, handlePending)
      .addCase(fetchQuiz.rejected, handleRejected)
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.quiz = action.payload;
      })
      .addCase(addQuiz.pending, handlePending)
      .addCase(addQuiz.rejected, handleRejected)
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.quiz.push(action.payload);
      })
      .addCase(deleteQuiz.pending, handlePending)
      .addCase(deleteQuiz.rejected, handleRejected)
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.quiz = state.items.quiz.filter(
          (q) => q.id !== action.payload.id
        );
      });
  },
});

export const quizReducer = quizSlice.reducer;

export const selectQuiz = (state) => state.quiz.items;
