import React from "react";
import { NavLink } from "react-router-dom"; // Correct import for NavLink

function Navbar({ isLogin, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Task Manager
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {isLogin && (
              <>
                <NavLink className="nav-item nav-link" to="/inputTasks">
                  Tasks
                </NavLink>
                <NavLink className="nav-item nav-link" to="/tasklist">
                  TaskList
                </NavLink>
                <NavLink className="nav-item nav-link" to="/userview">
                  UserView
                </NavLink>
              </>
            )}
          </div>
          {isLogin && (
            <div className="d-flex ms-auto">
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
