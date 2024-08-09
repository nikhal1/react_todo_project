import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../userslice/TaskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    // Load tasks from local storage and add them to Redux store if they don't already exist
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
      if (!tasks.find((existingTask) => existingTask.id === task.id)) {
        dispatch(addTask(task));
      }
    });
  }, [dispatch, tasks]);

  useEffect(() => {
    // Save tasks to local storage whenever the tasks array changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task List</h2>
      {tasks.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
