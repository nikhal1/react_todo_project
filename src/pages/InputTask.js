import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './userslice/TaskSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority
  const [error, setError] = useState(''); // State for error message
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) { 
      setError('Task cannot be empty'); // Show error if task input is empty
      return;
    }
    setError(''); // Clear error if input is valid
    dispatch(addTask({ id: Date.now(), title: task, priority }));
    setTask(''); // Clear input field after adding task
    setPriority('Medium'); // Reset priority to default
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3 align-items-center">
        <div className="col-md-8">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            className={`form-control ${error ? 'is-invalid' : ''}`} // Add 'is-invalid' class if there's an error
          />
          {error && <div className="invalid-feedback">{error}</div>} {/* Show error message */}
        </div>
        <div className="col-md-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
