import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import image from "../img/bg-5.jpeg";

import axios from "axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const navigate = useNavigate("");

  const [err, setErr] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8084/api/auth/signin", { username, password })
        .then((response) => {
          setMessage(response.data.message);

          localStorage.setItem("user", JSON.stringify(response.data));
        });

      navigate("/home");
      window.location.reload();
    } catch (err) {
      setErr(err.response.data);
    }
  };
  console.log(user);
  localStorage.clear();
  localStorage.setItem("user", user);

  return (
    <div className="login ">
      <div className="card d-flex align-items-center">
        <div className="left">
          <img className="login-image" src={image} />
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChangeUsername}
              validations={[required]}
            />
            <input
              id="login-input1"
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangePassword}
              validations={[required]}
            />

            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            {err && (
              <div
                style={{ marginLeft: "10rem", marginRight: "9rem" }}
                className="alert alert-danger"
                role="alert"
              >
                {err}
              </div>
            )}
            <span id="regi-ster">
              Don't you have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                id="btn"
              >
                Register
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
