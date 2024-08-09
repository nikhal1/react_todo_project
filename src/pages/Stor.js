import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './userslice/TaskSlice';
import userSlice from './userslice/userSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    userSlice:userSlice,
  },
});

export default store;
