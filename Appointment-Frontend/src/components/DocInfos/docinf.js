import { useLocation } from "react-router-dom";
import Header from "../Header1/header";
import { Link } from "react-router-dom";
import "./docinf.css";
import { useState, useEffect } from "react";
import axios from "axios";

const API_ENDPOINT = "http://localhost:8084/api/v1";

function DoctorInfos() {
  const [commentary, setCommentary] = useState([]);
  const [comment, setComment] = useState("");
  let body = comment;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  function verifyJavaScriptCode(text) {
    try {
      eval(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  const location = useLocation();
  const {
    name,
    image,
    email,
    description,
    joinDate,
    docLocation,
    specialization,
    phone,
    docId,
  } = location.state;
  console.log(location.state);

  const user = JSON.parse(localStorage.getItem("user"));
  let writerId = user.id;
  let writerName = user.username;
  let writerImage = user.image;

  useEffect(() => {
    const fetchCommentary = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/comments/${docId}`);
        const data = await response.json();
        setCommentary(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommentary();
  }, [comment]);

  console.log(commentary);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/comment`, {
        body,
        writerId,
        docId,
        writerImage,
        writerName,
      });

      console.log(response.data);
      setMessage(response.data.message);
      setComment("");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  setTimeout(() => {
    setMessage("");
    setError("");
  }, 3000);

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
      <div className="profile-container">
        <div className="profile-header">
          <img src={image} className="profile-image" />
          <div className="em-na">
            {" "}
            <h1 className="profile-name">{name}</h1>
            <div className="tags">
              <p id="em">{email}</p>
              <p id="sp">@{specialization}</p>
            </div>
            <p className="profile-other-info">
              Joined at {joinDate.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="profile-body">
          <h3>Description</h3>
          <br></br>
          <p className="profile-description">{description}</p>
        </div>
        <br></br>
        <div className="profile-body">
          <h3>Location and Access Informations</h3>
          <br></br>
          <p className="prof-loc">{docLocation}</p>
          <p className="prof-phone">Phone : {phone}</p>
        </div>

        <Link
          className="appoint"
          to={"/appointment"}
          state={{
            doc_name: name,
            doc_image: image,
            doc_email: email,
            doc_description: description,
            doc_joinDate: joinDate,
            doc_docLocation: docLocation,
            doc_specialization: specialization,
            doc_phone: phone,
            docId: docId,
          }}
        >
          Book Now
        </Link>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="com-search">
          <h3 style={{ marginTop: "10rem" }}>Reviews/Comments</h3>

          <form onSubmit={handleSubmit}>
            <input type="text" value={comment} onChange={handleCommentChange} />
            <button
              style={{
                backgroundColor: "blue",

                marginLeft: "1rem",
                color: "white",
              }}
              type="submit"
            >
              Comment..
            </button>
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </form>

          <div>
            {commentary &&
              commentary.map((review) => (
                <div className="commentary" key={review.id}>
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img
                        style={{
                          height: "2rem",
                          width: "2rem",
                          borderRadius: "1rem",
                        }}
                        src={review.writerImage}
                      />
                      <p
                        style={{ marginLeft: "0.5rem", marginTop: "0.266rem" }}
                      >
                        {review.writerName}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexdirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ color: "blue", marginTop: "0.5rem" }}>
                        📆{" "}
                        {new Date(review.timeOfCreation).toLocaleDateString()}
                      </p>
                      <p style={{ marginTop: "0.5rem" }}>
                        ⏱ {new Date(review.timeOfCreation).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <p>{review.body}</p>
                  <br></br>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorInfos;
