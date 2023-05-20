import React, { useEffect, useState } from "react";
import "./board.css";
import axios from "axios";

const Board = ({}) => {
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

    fetchAppointments();
  }, []);

  const handleCancelAppointment = (appointmentId) => {
    // Send a request to the backend API to cancel the appointment
    // You can customize this function based on your backend implementation
    console.log(`Cancel appointment with ID ${appointmentId}`);
  };

  const handleConfirmAppointment = (appointmentId) => {
    // Send a request to the backend API to confirm the appointment
    // You can customize this function based on your backend implementation
    console.log(`Confirm appointment with ID ${appointmentId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Doctor</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.appId}>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.docName}</td>
            <td>{appointment.status}</td>
            <td>
              {user === "doctor" ? (
                <>
                  <button
                    onClick={() => handleConfirmAppointment(appointment.appId)}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(appointment.appId)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleCancelAppointment(appointment.appId)}
                >
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
