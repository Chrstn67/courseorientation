"use client";

import { useState } from "react";
import { gameData } from "../data.jsx";

export default function RiddleComponent({
  stage,
  onCorrectAnswer,
  showHint,
  onShowHint,
  stageNumber,
  totalStages,
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answer.toLowerCase().trim() === stage.answer.toLowerCase()) {
      setFeedback(gameData.messages.correctAnswer);
      setTimeout(() => {
        onCorrectAnswer();
        setAnswer("");
        setFeedback("");
        setAttempts(0);
      }, 2000);
    } else {
      setFeedback(gameData.messages.wrongAnswer);
      setAttempts((prev) => prev + 1);
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  return (
    <div className="riddle-container">
      <div className="riddle-header">
        <div className="stage-indicator">
          <span className="stage-number">Étape {stageNumber}</span>
          <span className="stage-progress">sur {totalStages}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(stageNumber / totalStages) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="riddle-card">
        <div className="riddle-title">
          <h2>🧩 {stage.title}</h2>
        </div>

        <div className="riddle-image">
          <img
            src={stage.image || "/placeholder.svg"}
            alt={stage.locationName}
          />
        </div>

        <div className="riddle-content">
          <div className="riddle-text">
            <p>{stage.riddle}</p>
          </div>

          {showHint && (
            <div className="hint-box">
              <h4>💡 Indice :</h4>
              <p>{stage.hint}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="answer-form">
            <div className="input-group">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Votre réponse..."
                className="answer-input"
                required
              />
              <button type="submit" className="submit-button">
                🔍 Vérifier
              </button>
            </div>
          </form>

          {feedback && (
            <div
              className={`feedback ${
                feedback.includes("✅") ? "success" : "error"
              }`}
            >
              {feedback}
            </div>
          )}

          {attempts >= 2 && !showHint && (
            <button onClick={onShowHint} className="hint-button">
              💡 Besoin d'un indice ?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
