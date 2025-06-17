"use client";

import "../css/timer.css";

export default function TimerComponent({
  timeRemaining,
  totalTime,
  agentName,
}) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const percentage = (timeRemaining / totalTime) * 100;

  const getTimerStatus = () => {
    if (percentage > 60)
      return { status: "secure", color: "#00ff41", icon: "🟢" };
    if (percentage > 30)
      return { status: "warning", color: "#ffaa00", icon: "🟡" };
    return { status: "critical", color: "#ff0040", icon: "🔴" };
  };

  const timerStatus = getTimerStatus();

  return (
    <div className="timer-hud">
      <div className="hud-container">
        <div className="hud-left">
          <div className="agent-info">
            <span className="agent-label">AGENT</span>
            <span className="agent-name">{agentName}</span>
          </div>
        </div>

        <div className="hud-center">
          <div className="timer-display">
            <div className="timer-status">
              <span className="status-icon">{timerStatus.icon}</span>
              <span className="status-text">
                {timerStatus.status.toUpperCase()}
              </span>
            </div>
            <div className="timer-digits" style={{ color: timerStatus.color }}>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>

          <div className="timer-bar-container">
            <div className="timer-bar">
              <div
                className={`timer-progress ${timerStatus.status}`}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: timerStatus.color,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="hud-right">
          <div className="mission-status">
            <span className="status-label">STATUS</span>
            <span className="status-value">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
