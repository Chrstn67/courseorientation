"use client";

import { useState, useEffect } from "react";
import { gameData } from "../data.jsx";
import MapComponent from "../components/MapComponent.jsx";
import MissionComponent from "../components/MissionComponent.jsx";
import TimerComponent from "../components/TimerComponent.jsx";
import GameHeader from "../components/GameHeader.jsx";
import TimeSelector from "../components/TimeSelector.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";
import Footer from "../components/Footer.jsx";

import "../css/global.css";

export default function SpyMission() {
  const [currentMission, setCurrentMission] = useState(0);
  const [missions, setMissions] = useState(gameData.missions);
  const [gameStarted, setGameStarted] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(120);
  const [timeRemaining, setTimeRemaining] = useState(selectedTime * 60);
  const [showTimeSelector, setShowTimeSelector] = useState(true);
  const [agentName, setAgentName] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showMapHint, setShowMapHint] = useState(false);
  const [hackingMode, setHackingMode] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);

  // Gestion du timer
  useEffect(() => {
    if (gameStarted && !missionCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameStarted(false);
            setMissionFailed(true); // Ajouter cette ligne
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, missionCompleted, timeRemaining]);

  const handleMissionSuccess = () => {
    setHackingMode(true);

    setTimeout(() => {
      const updatedMissions = [...missions];

      if (currentMission + 1 < updatedMissions.length) {
        updatedMissions[currentMission + 1].unlocked = true;
        setCurrentMission(currentMission + 1);
      } else {
        setMissionCompleted(true);
        setGameStarted(false);
      }

      setMissions(updatedMissions);
      setShowHint(false);
      setShowMapHint(false);
      setHackingMode(false);
    }, 2000);
  };

  const startMission = () => {
    if (!agentName.trim()) {
      alert("Veuillez entrer votre nom de code, Agent !");
      return;
    }

    setGameStarted(true);
    setMissionCompleted(false);
    setCurrentMission(0);
    setTimeRemaining(selectedTime * 60);
    setShowTimeSelector(false);

    const resetMissions = gameData.missions.map((mission, index) => ({
      ...mission,
      unlocked: index === 0,
    }));
    setMissions(resetMissions);
  };

  const resetMission = () => {
    setGameStarted(false);
    setMissionCompleted(false);
    setMissionFailed(false); // Ajouter cette ligne
    setCurrentMission(0);
    setTimeRemaining(selectedTime * 60);
    setShowTimeSelector(true);
    setShowHint(false);
    setShowMapHint(false);
    setHackingMode(false);
    setAgentName("");

    const resetMissions = gameData.missions.map((mission, index) => ({
      ...mission,
      unlocked: index === 0,
    }));
    setMissions(resetMissions);
  };

  return (
    <div className="spy-container">
      <ParticleBackground />
      <div className="scanlines"></div>

      <GameHeader
        gameName={gameData.config.gameName}
        codeName={gameData.config.codeName}
        agencyName={gameData.config.agencyName}
        agentName={agentName}
      />

      <div className="mission-content">
        {showTimeSelector && (
          <div className="mission-briefing-screen">
            <div className="briefing-terminal">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <span className="terminal-title">SAJ AGENCY - CLASSIFIED</span>
              </div>

              <div className="terminal-content">
                <div className="typing-text">
                  <h2>🕵️ BRIEFING DE MISSION</h2>
                  <p className="mission-description">
                    {gameData.config.description}
                  </p>

                  <div className="agent-registration">
                    <label htmlFor="agentName">NOM DE CODE AGENT :</label>
                    <input
                      type="text"
                      id="agentName"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="Entrez votre nom de code..."
                      className="agent-input"
                      maxLength={20}
                    />
                  </div>

                  <TimeSelector
                    selectedTime={selectedTime}
                    onTimeChange={setSelectedTime}
                    timeOptions={gameData.config.timeOptions}
                  />

                  <div className="mission-stats">
                    <div className="stat-item">
                      <span className="stat-label">MISSIONS :</span>
                      <span className="stat-value">
                        {gameData.missions.length}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">DURÉE :</span>
                      <span className="stat-value">{selectedTime} MIN</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">CLASSIFICATION :</span>
                      <span className="stat-value">TOP SECRET</span>
                    </div>
                  </div>

                  <button className="start-mission-btn" onClick={startMission}>
                    <span className="btn-text">🚀 ACCEPTER LA MISSION</span>
                    <div className="btn-glitch"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameStarted && (
          <>
            <TimerComponent
              timeRemaining={timeRemaining}
              totalTime={selectedTime * 60}
              agentName={agentName}
            />

            {hackingMode && (
              <div className="hacking-overlay">
                <div className="hacking-screen">
                  <div className="matrix-rain"></div>
                  <h2>🔓 SYSTÈME PIRATÉ</h2>
                  <p>Accès autorisé... Prochaine mission débloquée...</p>
                </div>
              </div>
            )}

            <div className="mission-layout">
              <div className="mission-section">
                <MissionComponent
                  mission={missions[currentMission]}
                  onMissionSuccess={handleMissionSuccess}
                  showHint={showHint}
                  onShowHint={() => setShowHint(true)}
                  showMapHint={showMapHint}
                  onShowMapHint={() => setShowMapHint(true)}
                  missionNumber={currentMission + 1}
                  totalMissions={missions.length}
                  agentName={agentName}
                />
              </div>

              <div className="intel-section">
                <MapComponent
                  missions={missions}
                  currentMission={currentMission}
                  center={gameData.config.centerCoordinates}
                  zoom={gameData.config.zoomLevel}
                  showMapHint={showMapHint}
                />
              </div>
            </div>
          </>
        )}

        {missionCompleted && (
          <div className="mission-complete-screen">
            <div className="success-terminal">
              <div className="success-content">
                <div className="success-badge">
                  <div className="badge-glow"></div>
                  <h2>🎖️ MISSION ACCOMPLIE</h2>
                </div>
                <p className="success-message">
                  {gameData.messages.missionComplete}
                </p>
                <div className="agent-stats">
                  <div className="stat">
                    <span className="stat-icon">🕵️</span>
                    <span>Agent {agentName}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">✅</span>
                    <span>{missions.length} Missions Accomplies</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span>
                      Temps Restant: {Math.floor(timeRemaining / 60)}:
                      {(timeRemaining % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <button className="new-mission-btn" onClick={resetMission}>
                  🔄 NOUVELLE MISSION
                </button>
              </div>
            </div>
          </div>
        )}

        {missionFailed && (
          <div className="mission-failed-screen">
            <div className="failure-terminal">
              <div className="glitch-text">
                <h2>⚠️ MISSION ÉCHOUÉE</h2>
              </div>
              <p>{gameData.messages.timeUp}</p>
              <button className="retry-mission-btn" onClick={resetMission}>
                🔄 NOUVELLE TENTATIVE
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
