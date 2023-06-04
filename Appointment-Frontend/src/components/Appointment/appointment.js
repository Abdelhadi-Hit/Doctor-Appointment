import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import "./appointment.css";
import Header from "../Header1/header";
import Footer from "../Footer/footer";

function Appointment() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [patImage, setPatImage] = useState("");
  const [patName, setPatName] = useState("");
  const navigate = useNavigate("");

  const [id, setId] = useState("");

  const [status, setStatus] = useState("Pending");

  const location = useLocation();
  const {
    doc_name,
    doc_image,
    doc_email,
    doc_description,
    doc_joinDate,
    doc_docLocation,
    doc_specialization,
    doc_phone,
    docId,
  } = location.state;
  console.log(location.state);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setId(user.id);
    setPatImage(user.image);
    setPatName(user.username);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Data = {
      date: date,
      location: doc_docLocation,
      docImage: doc_image,
      docName: doc_name,
      patImage: patImage,
      patName: patName,
      time: time,
      docId: docId,
      patId: id,
      status: status,
    };
    console.log(Data);
    console.log(time);
    await axios
      .post("http://localhost:8084/api/v1/appointments", Data)
      .then((response) => {
        console.log(Data);

        setSuccessful(true);
        setMessage(response.data.message);
        console.log(response.data);
        setTimeout(() => {
          navigate("/board");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setSuccessful(false);
        setMessage(error.response.data.message);
      });

    setTimeout(() => {
      setSuccessful(false);
      setMessage("");
      setTime("");
    }, 3000);
  };

  const minDate = new Date();

  return (
    <>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form id="formm" onSubmit={handleSubmit}>
        <label htmlFor="Date">Date:</label>
        <DatePicker
          id="Date"
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={minDate}
        />
        <label style={{ marginTop: "1rem" }} htmlFor="Date">
          Time:
        </label>
        <TimePicker
          id="Time"
          value={time}
          onChange={(newTime) => setTime(newTime)}
          disableClock={true}
        />
        <br></br>

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
        <button className="val-book" type="submit">
          Appoint
        </button>
      </form>
      <br></br>
      <Footer />
    </>
  );
}

export default Appointment;
