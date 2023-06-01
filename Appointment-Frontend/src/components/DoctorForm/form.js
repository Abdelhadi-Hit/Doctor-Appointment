import React, { useEffect, useState } from "react";
import axios from "axios";
import "./form.css";
import Header from "../Header1/header";
import Footer from "../Footer/footer";

const DoctorForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [city, setCity] = useState("");
  const [tele, setTele] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [liscence, setLiscence] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userId, setUserId] = useState("");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAvailability((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLiscenceChange = (event) => {
    setLiscence(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setName(user.username);
    setCity(user.city);
    setImageUrl(user.image);
    setEmail(user.email);
    setTele(user.tele);
    setUserId(user.id);
  };

  const setUserAsDoctor = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user._doctor = true;
    //console.log(user._doctor);
    localStorage.setItem("user", JSON.stringify(user));
  };

  console.log(typeof userId);

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(`http://localhost:8084/api/v1/doctors/doctor?userId=${userId}`, {
        name,
        email,
        tele,
        imageUrl,
        city,
        specialization,
        description,
        availability,
        location,
      })
      .then((response) => {
        console.log(response.data);
        setSuccessful(true);
        setUserAsDoctor();

        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setSuccessful(false);
      });

    setTimeout(() => {
      setAvailability("");
      setDescription("");
      setSpecialization("");
      setAvailability(false);
      setLiscence("");
      setLocation("");
      setSuccessful(false);
      setMessage("");
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
      <br></br>
      <br></br>
      <br></br>
      <form id="form" onSubmit={handleSubmit}>
        <p
          style={{
            color: "blue",
            position: "relative",
            fontFamily: "monospace",
            fontSize: "1.5rem",
          }}
        >
          All fields on this form are mondatory!!
        </p>
        <label htmlFor="specialization">Specialization</label>
        <input
          className="form-input"
          type="text"
          id="specialization"
          value={specialization}
          onChange={handleSpecializationChange}
        />
        <label className="fill-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label className="fill-label" htmlFor="location">
          Location
        </label>
        <input
          className="form-input"
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
        <label className="fill-label" htmlFor="liscence">
          Liscence Number
        </label>
        <input
          className="form-input"
          type="text"
          id="liscence"
          value={liscence}
          onChange={handleLiscenceChange}
        />

        <label className="fill-label" htmlFor="payment">
          Payment Method
        </label>
        <select
          className="payment-op"
          placeholder="Payment Method"
          name="paymentMethod"
          onChange={(e) => {
            setPaymentMethod(e.target.value);
          }}
        >
          <option className="op1" value="specs">
            Specs Only
          </option>
          <option className="op1" vlaue="checks">
            Checks Only
          </option>
          <option className="op1" value="specs and checks">
            Both Specs and Checks
          </option>
        </select>

        <label className="fill-label" htmlFor="selection">
          Days Available
        </label>
        <div className="days-check">
          <label id="l" htmlFor="monday">
            Mon
            <input
              type="checkbox"
              name="monday"
              checked={availability.monday}
              onChange={handleCheckboxChange}
            />
          </label>
          <label id="l" htmlFor="tuesday">
            Tue
            <input
              type="checkbox"
              name="tuesday"
              checked={availability.tuesday}
              onChange={handleCheckboxChange}
            />
          </label>
          <label id="l" htmlFor="wednesday">
            Wed
            <input
              type="checkbox"
              name="wednesday"
              checked={availability.wednesday}
              onChange={handleCheckboxChange}
            />
          </label>
          <label id="l" htmlFor="thursday">
            Thu
            <input
              type="checkbox"
              name="thursday"
              checked={availability.thursday}
              onChange={handleCheckboxChange}
            />
          </label>
          <label id="l" htmlFor="friday">
            Fri
            <input
              type="checkbox"
              name="friday"
              checked={availability.friday}
              onChange={handleCheckboxChange}
            />
          </label>
          <label id="l" htmlFor="saturday">
            Sat
            <input
              type="checkbox"
              name="saturday"
              checked={availability.saturday}
              onChange={handleCheckboxChange}
            />
          </label>
          <label id="l" htmlFor="sunday">
            Sun
            <input
              type="checkbox"
              name="sunday"
              checked={availability.sunday}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <br></br>
      <Footer />
    </>
  );
};

export default DoctorForm;
