import { createSlice } from '@reduxjs/toolkit';


const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = action.payload;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
});

export const { addTask, deleteTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
