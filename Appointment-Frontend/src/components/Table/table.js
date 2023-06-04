import Appointment from "../Appointment/appointment";
import "./table.css";
import React, { useEffect, useState } from "react";
import Header from "../Header1/header";
import Footer from "../Footer/footer";
import axios from "axios";

const Table = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointments2, setAppointments2] = useState([]);

  const API_ENDPOINT = "http://localhost:8084/api/v1/appointments/maker";
  const API_ENDPOINT2 = "http://localhost:8084/api/v1/appointments/doctor";

  let trigger = 0;

  const user = JSON.parse(localStorage.getItem("user"));
  let id = user.id;

  console.log(id);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`);
      const resp = await fetch(`${API_ENDPOINT2}/${id}`);

      const data = await response.json();
      const doctorData = await resp.json();

      setAppointments(data);
      setAppointments2(doctorData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  console.log("fetched");
  console.log(appointments);
  console.log(appointments2);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:8084/api/v1/appointments/${appointmentId}`
      );

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:8084/api/v1/appointments/status/${appointmentId}`
      );

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h className="tb-title">Upcoming Appointments with your doctors</h>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Location</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments &&
                  appointments.map((appointment) => (
                    <tr key={appointment.appId}>
                      <th scope="row">
                        <div
                          style={{
                            marginTop: "1.3rem",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <p>
                            {" "}
                            {new Date(appointment.date).toLocaleDateString()}
                          </p>
                          <p style={{ color: "blue", marginLeft: "9rem" }}>
                            {" "}
                            At {appointment.time}
                          </p>
                        </div>
                      </th>
                      <td>
                        <div style={{ marginTop: "1.3rem" }}>
                          {appointment.location}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex" }}>
                          <img
                            style={{
                              height: "4rem",
                              width: "4rem",
                              borderRadius: "2rem",
                            }}
                            src={appointment.docImage}
                          />

                          <p
                            style={{ marginTop: "1.3rem", marginLeft: "1rem" }}
                          >
                            {appointment.docName}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p style={{ marginTop: "1.3rem" }}>
                          {appointment.status}
                        </p>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(appointment.appId)}
                          style={{ marginLeft: "1rem" }}
                          type="button"
                          class="btn btn-danger"
                          id="btn-c"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {user._doctor && (
        <>
          <h className="tb-title">Upcoming Appointments with your patients </h>
          <div class="container">
            <div class="row">
              <div class="col-12">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Location</th>
                      <th scope="col">Doctor</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments2 &&
                      appointments2.map((doc_appointment) => (
                        <tr key={doc_appointment.appId}>
                          <th scope="row">
                            <div
                              style={{
                                marginTop: "1.3rem",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <p>
                                {" "}
                                {new Date(
                                  doc_appointment.date
                                ).toLocaleDateString()}
                              </p>
                              <p style={{ color: "blue", marginLeft: "9rem" }}>
                                {" "}
                                At {doc_appointment.time}
                              </p>
                            </div>
                          </th>
                          <td>
                            <div style={{ marginTop: "1.3rem" }}>
                              {doc_appointment.location}
                            </div>
                          </td>
                          <td>
                            <div style={{ display: "flex" }}>
                              <img
                                style={{
                                  height: "4rem",
                                  width: "4rem",
                                  borderRadius: "2rem",
                                }}
                                src={doc_appointment.patImage}
                              />

                              <p
                                style={{
                                  marginTop: "1.3rem",
                                  marginLeft: "1rem",
                                }}
                              >
                                {doc_appointment.patName}
                              </p>
                            </div>
                          </td>
                          <td>
                            <p style={{ marginTop: "1.3rem" }}>
                              {doc_appointment.status}
                            </p>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleDelete(doc_appointment.appId)
                              }
                              style={{ marginLeft: "1rem" }}
                              type="button"
                              class="btn btn-danger"
                              id="btn-c"
                            >
                              Cancel
                            </button>
                            {true && (
                              <button
                                onClick={() =>
                                  handleConfirm(doc_appointment.appId)
                                }
                                style={{ marginLeft: "1rem" }}
                                type="button"
                                class="btn btn-success"
                                id="btn-c"
                              >
                                Confirm
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Table;
