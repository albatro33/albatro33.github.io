import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './features/blogSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

// TypeScript 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

