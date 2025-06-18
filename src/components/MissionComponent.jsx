"use client";

import { useState, useEffect } from "react";
import { gameData } from "../data.jsx";
import "../css/mission.css";

export default function MissionComponent({
  mission,
  onMissionSuccess,
  showHint,
  onShowHint,
  showMapHint,
  onShowMapHint,
  missionNumber,
  totalMissions,
  agentName,
}) {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Auto-scroll to top when mission changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [missionNumber]);

  const dangerLevel = gameData.dangerLevels[mission.dangerLevel];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDecrypting(true);

    setTimeout(() => {
      if (code.toLowerCase().trim() === mission.solution.toLowerCase()) {
        setFeedback(gameData.messages.correctCode);
        setTimeout(() => {
          onMissionSuccess();
          setCode("");
          setFeedback("");
          setAttempts(0);
        }, 2000);
      } else {
        setFeedback(gameData.messages.wrongCode);
        setAttempts((prev) => prev + 1);
        setTimeout(() => setFeedback(""), 3000);
      }
      setIsDecrypting(false);
    }, 1500);
  };

  return (
    <div className="mission-container">
      <div className="mission-header">
        <div className="mission-progress">
          <div className="progress-info">
            <span className="mission-counter">
              MISSION {missionNumber}/{totalMissions}
            </span>
            <span className="agent-id">AGENT {agentName}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(missionNumber / totalMissions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mission-terminal">
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="control red"></span>
            <span className="control yellow"></span>
            <span className="control green"></span>
          </div>
          <span className="terminal-title">
            CLASSIFIED - {mission.classification}
          </span>
        </div>

        <div className="terminal-body">
          <div className="mission-info">
            <div className="mission-title">
              <h2>📋 {mission.codeName}</h2>
              <div
                className="danger-badge"
                style={{ backgroundColor: dangerLevel.color }}
              >
                {dangerLevel.icon} {mission.dangerLevel}
              </div>
            </div>

            <div className="location-info">
              <div className="location-item">
                <span className="label">CIBLE :</span>
                <span className="value">{mission.locationName}</span>
              </div>
              {showMapHint && (
                <div className="location-item revealed">
                  <span className="label">POSITION :</span>
                  <span className="value">
                    {mission.coordinates[0].toFixed(4)},{" "}
                    {mission.coordinates[1].toFixed(4)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="objective-box">
            <h4>🎯 OBJECTIF :</h4>
            <p>{mission.missionObjective}</p>
          </div>

          <div className="mission-briefing">
            <h3>{gameData.messages.missionBriefing}</h3>
            <p className="briefing-text">{mission.briefing}</p>
          </div>

          <div className="encryption-section">
            <h3>🔐 MESSAGE CRYPTÉ</h3>
            <div className="encrypted-message">
              <div className="cipher-info">
                <span className="cipher-type">
                  CHIFFREMENT : {mission.cipher}
                </span>
              </div>
              <div className="message-display">
                <code className="encrypted-code">
                  {mission.encryptedMessage}
                </code>
              </div>
            </div>

            {showHint && (
              <div className="hint-terminal">
                <div className="hint-header">💡 INDICE 1 - DÉCHIFFREMENT</div>
                <p className="hint-text">{mission.hint}</p>
              </div>
            )}

            {showMapHint && (
              <div className="hint-terminal map-hint">
                <div className="hint-header">
                  🗺️ INDICE 2 - POSITION RÉVÉLÉE
                </div>
                <p className="hint-text">
                  La position de la cible a été révélée sur la carte satellite.
                  Consultez la carte pour localiser précisément votre objectif.
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="decryption-form">
            <div className="input-section">
              <label htmlFor="codeInput">🔓 CODE DÉCHIFFRÉ :</label>
              <div className="input-group">
                <input
                  type="text"
                  id="codeInput"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Entrez le code déchiffré..."
                  className="code-input"
                  required
                  disabled={isDecrypting}
                />
                <button
                  type="submit"
                  className={`decrypt-button ${
                    isDecrypting ? "decrypting" : ""
                  }`}
                  disabled={isDecrypting}
                >
                  {isDecrypting ? (
                    <>
                      <span className="loading-spinner"></span>
                      DÉCRYPTAGE...
                    </>
                  ) : (
                    <>🔍 DÉCRYPTER</>
                  )}
                </button>
              </div>
            </div>
          </form>

          {feedback && (
            <div
              className={`feedback-terminal ${
                feedback.includes("✅") ? "success" : "error"
              }`}
            >
              <div className="feedback-content">{feedback}</div>
            </div>
          )}

          <div className="hint-buttons">
            {attempts >= 2 && !showHint && (
              <button onClick={onShowHint} className="hint-request-btn">
                💡 INDICE 1 - DÉCHIFFREMENT
              </button>
            )}

            {attempts >= 4 && !showMapHint && (
              <button
                onClick={onShowMapHint}
                className="hint-request-btn map-hint-btn"
              >
                🗺️ INDICE 2 - POSITION SATELLITE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
