import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { BASE_URL } from "../constants.js";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try {
        // console.log('Registering user:', formData);
        const response = await axios.post(`${BASE_URL}/user/register`, {
          email: formData.email,
          password: formData.password,
        });
        console.log("Success:", response.data);
        setMessage("Registration successful!");
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data);
          setMessage(error.response.data.message || "Registration failed"); // Show server error
        } else if (error.request) {
          console.error("Network error:", error.request);
          setMessage("Network error. Please try again.");
        } else {
          console.error("Error:", error.message);
          setMessage("An unexpected error occurred.");
        }
      }
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
          email: formData.email,
          password: formData.password,
        });
        console.log("Success:", response);
        setMessage("Login successful!");

        if (response.data?.token) {
          localStorage.setItem("email",formData.email)
          localStorage.setItem("token", response.data.token);
          setMessage("Login successful!");
          navigate("/home");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data);
          setMessage(error.response.data.message || "Login failed"); // Show server error
        } else if (error.request) {
          console.error("Network error:", error.request);
          setMessage("Network error. Please try again.");
        } else {
          console.error("Error:", error.message);
          setMessage("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <span>{message}</span>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
      </form>
    </div>
  );
};

export default Login;
