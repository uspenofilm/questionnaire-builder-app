import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://questionnaire-builder-backend-hhh5.onrender.com",
});

export const fetchQuiz = createAsyncThunk(
  "quiz/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await authInstance.get(
        `/quiz?page=${_?.page ?? 1}&limit=12`
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addQuiz = createAsyncThunk(
  "quiz/addQuiz",
  async (quiz, thunkAPI) => {
    try {
      const response = await authInstance.post("/quiz/", quiz);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async (quizId, thunkAPI) => {
    try {
      const response = await authInstance.delete(`/quiz/${quizId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
