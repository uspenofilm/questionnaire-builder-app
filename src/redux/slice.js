import { createSlice } from "@reduxjs/toolkit";
import { fetchQuiz, addQuiz, deleteQuiz } from "./operations.js";

const handlePending = (state) => {
  state.status = "loading";
  state.error = null;
};

const handleRejected = (state, action) => {
  state.status = "failed";
  state.error = action.payload;
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    items: {
      data: [],
      page: 1,
      perPage: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    status: "idle",
    error: null,
    addItemStatus: "idle",
    addItemError: null,
    deleteItemStatus: "idle",
    deleteItemError: null,
  },
  reducers: {
    resetAddItemStatus: (state) => {
      state.addItemStatus = "idle";
      state.addItemError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, handlePending)
      .addCase(fetchQuiz.rejected, handleRejected)
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload.data;
      })
      .addCase(addQuiz.pending, (state) => {
        state.addItemStatus = "loading";
        state.addItemError = null;
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.addItemStatus = "failed";
        state.addItemError = action.payload;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.addItemStatus = "succeeded";
        state.error = null;
        state.items?.data?.push(action.payload.data);
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.deleteItemStatus = "loading";
        state.deleteItemError = null;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.deleteItemStatus = "failed";
        state.deleteItemError = action.payload;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.deleteItemStatus = "succeeded";
        state.deleteItemError = null;
        if (state.items?.data) {
          state.items.data = state.items.data.filter(
            (q) => q.id !== action.payload.id
          );
        }
      });
  },
});

export const { resetAddItemStatus } = quizSlice.actions;

export const quizReducer = quizSlice.reducer;

export const selectQuiz = (state) => state.quiz.items;
