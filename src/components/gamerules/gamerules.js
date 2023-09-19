import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./gamerules.css";

const GameRules = () => {
  // Get the current user data from Redux state
  const currentUser = useSelector((state) => state.gameReducer.currentUserData);

  const navigate = useNavigate();
  const gameDuration = 40;

  // Function to handle the "Continue" button click
  const handleContinueClick = () => {
    navigate("/game"); // Navigate to the game page
  };

  // Determine the target score based on the user's level
  let targetScore = 0;
  switch (currentUser.level) {
    case "Easy":
      targetScore = 10;
      break;
    case "Medium":
      targetScore = 15;
      break;
    case "Hard":
      targetScore = 25;
      break;
    default:
      break;
  }

  return (
    <div className="game-rules-container">
      <h2 className="game-title">Green Light, Red Light Game</h2>
      <div className="rules-content">
        <p className="game-description">
          Objective: Click the green light {targetScore} times within{" "}
          {gameDuration} seconds.
        </p>
        <p className="rules-text">Rules:</p>
        <ul className="rules-list">
          <li className="list">Click the green light to earn points.</li>
          <li className="list">Avoid clicking when the light is red.</li>
          <li className="list">
            You have {gameDuration} seconds to complete the game.
          </li>
        </ul>
      </div>
      <button className="continue-button" onClick={handleContinueClick}>
        Continue
      </button>
    </div>
  );
};

export default GameRules;
