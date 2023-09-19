import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addScoreData } from "../../actions";
import { GoMute, GoUnmute } from "react-icons/go";

import "./GreenLightRedLight.css";
import audio from "../../Assets/squidGameAudio.mp3";
import Cookies from "js-cookie";

const GreenLightRedLight = () => {
  // Redux state to get current user data
  //const currentUser = useSelector((state) => state.gameReducer.currentUserData);

  const currentUser = JSON.parse(
    localStorage.getItem("userData")
  ).currentUserData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameDuration = 40;

  // State variables
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [timer, setTimer] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGreen, setIsGreen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const bestScoreRef = useRef(0);

  // Initialize user object
  const user = {
    name: currentUser.name,
    level: currentUser.level,
    time: gameDuration - timer,
  };

  // Calculate target score based on the user's level
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

  // Effect for game logic
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setIsGreen(false); // Set initially to red

        // Generating a random delay between 1 and 2 seconds
        const randomDelay = Math.random() * 1000 + 1000;

        setTimeout(() => {
          setIsGreen(true); // Set to green after the random delay
        }, randomDelay);

        setTimer((prevTimer) => prevTimer + 1);

        if (timer === gameDuration) {
          const audio = audioRef.current;
          audio.pause();
          audio.loop = true;
          audio.currentTime = 0;

          setGameOver(true);
          setWin(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, timer, gameDuration, isGreen]);

  // Function to start the game
  const handleStartGame = () => {
    const audio = audioRef.current;
    audio.play();

    setGameStarted(true);
    setScore(0);
    setTimer(0);
    setGameOver(false);
    setBestScore(bestScoreRef.current);
  };

  // Function to restart the game
  const handleRestartGame = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.loop = true;
    audio.currentTime = 0;

    setGameStarted(false);
    setScore(0);
    setTimer(0);
    setGameOver(false);
  };

  // Function to handle box click
  const handleBoxClick = () => {
    if (gameStarted && !gameOver) {
      if (isGreen) {
        const newScore = score + 1;
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
          bestScoreRef.current = newScore;
        }

        if (newScore === targetScore) {
          const audio = audioRef.current;
          audio.pause();
          audio.loop = true;
          audio.currentTime = 0;

          setGameOver(true);
          setWin(true);
          dispatch(addScoreData(user));
        }
      } else {
        setWin(false);
        setGameOver(true);
        const audio = audioRef.current;
        audio.pause();
        audio.loop = true;
        audio.currentTime = 0;
      }
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    Cookies.remove("Token");
    navigate("/");
  };

  // Function to toggle audio mute/unmute
  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="game-container">
      <div className="user-info">
        <div>
          <span className="username">{currentUser.name}</span>
          <span>Level: {currentUser.level}</span>
          <span>Target Score: {targetScore}</span>
          <span>Best Score: {bestScore}</span>
        </div>
        <div>
          {/* Audio element for game sound */}
          <audio ref={audioRef}>
            <source src={audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={toggleMute}>
            {isMuted ? <GoMute /> : <GoUnmute />}
          </button>
        </div>
        <Link to="/scoreboard">
          <button>Score Board</button>
        </Link>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div className="green-light-red-light-container">
        {!gameStarted ? (
          <div className="button-container">
            <button onClick={handleStartGame}>Start Game</button>
            <p className="max-score-text">Best Scored: {bestScore}</p>
          </div>
        ) : (
          <div>
            {gameOver ? (
              ""
            ) : (
              <>
                <p className="timer">
                  00:
                  {gameDuration - timer < 10
                    ? `0${gameDuration - timer}`
                    : gameDuration - timer}
                </p>
                <div
                  className={isGreen ? "green-box" : "red-box"}
                  onClick={handleBoxClick}
                ></div>
              </>
            )}
            {gameOver ? (
              <h1 className={win ? "green-message" : "red-message"}>
                {win ? "You Win!" : "Game Over!"}
              </h1>
            ) : (
              ""
            )}
            <p>Score: {score}</p>
            <button onClick={handleRestartGame}>Restart Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenLightRedLight;
