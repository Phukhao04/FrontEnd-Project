import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    const { username, password } = formData;
    axios
      .post("http://localhost:5000/login", { username, password })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/todolist");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch(() => {
        setMessage("Error logging in");
      });
  };  

  return (
    <div className="superlogin">
    <div className="container">
      <div className="welcome-section">
        <h1>Welcome Back!</h1>
        <p>Login to access your To-Do List</p>
      </div>

      <div className="login-section">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="buttonsm" type="submit">Login</button>
        </form>
        <p>Don't have an account?</p>
        <button className="buttonsu" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
    </div>
    );
};

export default Login;
