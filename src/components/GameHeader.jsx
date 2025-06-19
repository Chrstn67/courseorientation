"use client";

import "../css/header.css";

export default function GameHeader({
  gameName,
  codeName,
  agencyName,
  agentName,
}) {
  return (
    <header className="spy-header">
      <div className="header-grid">
        <div className="header-left">
          <div className="agency-logo">
            <div className="logo-icon">🕵️</div>
            <div className="agency-info">
              <h1 className="game-title">{gameName}</h1>
              <p className="agency-name">{agencyName}</p>
            </div>
          </div>
        </div>

        <div className="header-center">
          <div className="classification-banner">
            <div className="classification-text">
              <span className="classified-label">CLASSIFIED</span>
              <span className="code-name">{codeName}</span>
            </div>
            <div className="security-level">
              <span className="security-dots">●●●●●</span>
              <span className="clearance">TOP SECRET</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="system-info">
            <div className="system-status">
              <span className="status-dot active"></span>
              <span className="status-text">SYSTÈME ACTIF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-scanline"></div>
    </header>
  );
}
