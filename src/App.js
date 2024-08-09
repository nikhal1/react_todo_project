import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import InputTasks from "./pages/InputTask";
import Login from "./pages/loginPage/Login";
import Navbar from "./pages/navbar/Navbar";
import TaskList from "./pages/listedData/TaskList";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserView from "./pages/userview/Userview";

const ProtectedRoute = ({ element, isLogin }) => {
  return isLogin ? element : <Navigate to="/" />;
};

const RedirectLoggedIn = ({ element, isLogin }) => {
  return !isLogin ? element : <Navigate to="/inputTasks" />;
};

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedIsLogin = localStorage.getItem("isLogin") === "true";
    setIsLogin(storedIsLogin);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLogin", "true");
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLogin={isLogin} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <RedirectLoggedIn
                element={<Login onLogin={handleLogin} />}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/inputTasks"
            element={
              <ProtectedRoute element={<InputTasks />} isLogin={isLogin} />
            }
          />
          <Route
            path="/userview"
            element={
              <ProtectedRoute element={<UserView />} isLogin={isLogin} />
            }
          />
          <Route
            path="/tasklist"
            element={
              <ProtectedRoute element={<TaskList />} isLogin={isLogin} />
            }
          />
          {/* Redirect to a default page if the route is not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
