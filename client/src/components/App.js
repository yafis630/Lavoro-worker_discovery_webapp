import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UserHome from "./UserHome";
import WorkerHome from "./WorkerHome";
import Workers from "./Workers";

import { AuthProvider } from "../context/AuthProvider";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <div className="header-holder">
            <h1 className="ui header main-title">Lavoro</h1>
          </div>

          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/users/home" element={<UserHome />} exact />
            <Route path="/workers/home" element={<WorkerHome />} exact />
            <Route path="/workers/:category" element={<Workers />} exact />
          </Routes>
          <div className="main-text-holder footer">
            <h5 className="ui header main-title">LAVORO © 2022</h5>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
