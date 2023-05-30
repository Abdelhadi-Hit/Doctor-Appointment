import { useLocation } from "react-router-dom";
import Header from "../Header1/header";
import { Link } from "react-router-dom";
import "./docinf.css";

function DoctorInfos() {
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
      </div>
    </>
  );
}

export default DoctorInfos;
