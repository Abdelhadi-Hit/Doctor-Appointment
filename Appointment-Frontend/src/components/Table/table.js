import Appointment from "../Appointment/appointment";
import "./table.css";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [appointments, setAppointments] = useState([]);
  const API_ENDPOINT = "http://localhost:8084/api/v1/appointments/maker";

  const user = JSON.parse(localStorage.getItem("user"));
  let id = user.id;

  console.log(id);

  useEffect(() => {
    // Fetch appointments from the backend API
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/${id}`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    console.log("fetched");
    console.log(appointments);

    fetchAppointments();
  }, []);
  return (
    <>
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
                        <div style={{ marginTop: "1.3rem" }}>
                          {appointment.date}
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
                          style={{ marginLeft: "1rem" }}
                          type="button"
                          class="btn btn-danger"
                        >
                          Cancel
                        </button>
                        {false && (
                          <button
                            style={{ marginLeft: "1rem" }}
                            type="button"
                            class="btn btn-success"
                          >
                            Confirm
                          </button>
                        )}

                        <button
                          style={{ marginLeft: "1rem" }}
                          type="button"
                          class="btn btn-success"
                        >
                          Confirm
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
