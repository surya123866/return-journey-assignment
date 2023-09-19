import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./scoreboard.css";

const Scoreboard = () => {
  const Data = useSelector((state) => state.gameReducer.scoreData);

  // Separate scores into different levels
  const easyTimes = Data.filter((time) => time.level === "Easy");
  const mediumTimes = Data.filter((time) => time.level === "Medium");
  const hardTimes = Data.filter((time) => time.level === "Hard");

  // Sort the times in increasing order for each level
  const sortedEasyTimes = easyTimes.sort((a, b) => a.time - b.time);
  const sortedMediumTimes = mediumTimes.sort((a, b) => a.time - b.time);
  const sortedHardTimes = hardTimes.sort((a, b) => a.time - b.time);

  return (
    <div className="scoreboard">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan="4">Easy Level</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedEasyTimes.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th colSpan="3">Medium Level</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedMediumTimes.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th colSpan="3">Hard Level</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedHardTimes.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/game">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Scoreboard;
