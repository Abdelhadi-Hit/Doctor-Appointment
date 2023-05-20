import React, { useState } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function AvailabilitySelector() {
  const [availableDays, setAvailableDays] = useState([]);
  const [availability, setAvailability] = useState({});

  const handleDayChange = (event) => {
    const day = event.target.value;
    setAvailableDays((prevAvailableDays) =>
      prevAvailableDays.includes(day)
        ? prevAvailableDays.filter((d) => d !== day)
        : [...prevAvailableDays, day]
    );
  };

  const handleAvailabilityChange = (event) => {
    const day = event.target.dataset.day;
    const time = event.target.value;
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: time,
    }));
  };

  return (
    <div className="availability">
      <div className="days">
        <p>Select available days:</p>
        {days.map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              checked={availableDays.includes(day)}
              onChange={handleDayChange}
            />
            {day}
          </label>
        ))}
      </div>
      <div className="times">
        <p>Select available times:</p>
        {days.map((day) =>
          availableDays.includes(day) ? (
            <div key={day}>
              <h4>{day}</h4>
              <label>
                Morning:
                <input
                  type="time"
                  value={availability[day]?.morning || ""}
                  data-day={day}
                  onChange={handleAvailabilityChange}
                />
              </label>
              <label>
                Afternoon:
                <input
                  type="time"
                  value={availability[day]?.afternoon || ""}
                  data-day={day}
                  onChange={handleAvailabilityChange}
                />
              </label>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default AvailabilitySelector;
