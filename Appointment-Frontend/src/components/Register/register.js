import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

import HealthLogo from "../img/bg-5.jpeg";
import { cities } from "./cities";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [city, setCity] = useState("");
  const [tele, setTele] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    try {
      const res = await axios.post("http://localhost:8084/api/auth/signup", {
        username,
        password,
        email,
        tele,
        imageUrl,
        city,
      });
      console.log(res.data);
      setMessage(res.data.message);
      setSuccessful(true);
      //  to login
      navigate("/");
    } catch (error) {
      const resMessage = error.message;
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  const handleImageChange = async (event) => {
    const cloud_name = "dn37xrd9r";

    const preset_key = "ml_default";
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImageUrl(res.data.secure_url))

      .catch((err) => console.log(err));
  };
  console.log(imageUrl);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1></h1>
          <p></p>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              id="input-us"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="city">
              <select
                className="city-op"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              placeholder="Tele"
              name="tele"
              onChange={(e) => {
                setTele(e.target.value);
              }}
            />
            <input
              type="file"
              placeholder="Photo"
              name="image"
              onChange={handleImageChange}
            />

            <div id="validate" className="d-flex align-items-center gap-3">
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <button onClick={handleRegister}>Register</button>
              <span id="log-in">
                Already have an account?
                <button
                  id="log"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login
                </button>
              </span>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
