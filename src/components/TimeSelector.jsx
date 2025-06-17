"use client";

import "../css/time-selector.css";

export default function TimeSelector({
  selectedTime,
  onTimeChange,
  timeOptions,
}) {
  return (
    <div className="time-selector">
      <h3>⏱️ DURÉE DE LA MISSION</h3>
      <div className="time-options">
        {timeOptions.map((time) => (
          <button
            key={time}
            className={`time-option ${selectedTime === time ? "selected" : ""}`}
            onClick={() => onTimeChange(time)}
          >
            <div className="time-display">
              <span className="time-value">{time}</span>
              <span className="time-unit">MIN</span>
            </div>
            <div className="time-description">
              {time <= 45 ? "SPRINT" : time <= 90 ? "STANDARD" : "MARATHON"}
            </div>
          </button>
        ))}
      </div>

      <div className="custom-time">
        <label htmlFor="customTime">Temps personnalisé (minutes) :</label>
        <input
          type="number"
          id="customTime"
          min="1"
          max="300"
          value={selectedTime}
          onChange={(e) => onTimeChange(Number.parseInt(e.target.value) || 60)}
          className="custom-time-input"
        />
      </div>
    </div>
  );
}
