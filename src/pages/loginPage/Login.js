import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function Login({onLogin}) {
  const [data, setData] = useState({
    gmail: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const predefinedGmail = "nik@gmail.com";
  const predefinedPassword = "nik@123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
    setError(""); // Clear error when input changes
  };

  const handleClick = () => {
    if (data.gmail === "" || data.password === "") {
      setError("Please fill in all fields.");
    } else if (data.gmail !== predefinedGmail || data.password !== predefinedPassword) {
      setError("Incorrect email or password.");
    } else {
      navigate('/inputTasks');
      onLogin();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center " style={{marginTop:"130px"}}>
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            <div className="mb-3">
              <label htmlFor="gmail" className="form-label">Email</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={data.gmail}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={handleClick}
              className="btn btn-primary w-100"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
