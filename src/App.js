import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import GreenLightRedLight from "./components/GamePage/GreenLightRedLight";
import RegistrationForm from "./components/RgistrationPage/Registration";
import GameRules from "./components/gamerules/gamerules";
import Scoreboard from "./components/scoreboard/scoreboard";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

function App() {
  return (
    <div className="App">
      {/* Set up routing using BrowserRouter */}
      <BrowserRouter>
        <Routes>
          {/* Route for the RegistrationForm component */}
          <Route path="/" element={<RegistrationForm />} />

          {/* Route for the GameRules component, wrapped in a ProtectedRoute */}
          <Route
            path="/rules"
            element={<ProtectedRoute Component={GameRules} />}
          />

          {/* Route for the GreenLightRedLight component, wrapped in a ProtectedRoute */}
          <Route
            path="/game"
            element={<ProtectedRoute Component={GreenLightRedLight} />}
          />

          {/* Route for the Scoreboard component, wrapped in a ProtectedRoute */}
          <Route
            path="/scoreboard"
            element={<ProtectedRoute Component={Scoreboard} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
