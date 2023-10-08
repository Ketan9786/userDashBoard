import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewUserReg from "./components/NewUserReg";
import UserS from "./components/UserS";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-user-registration" element={<NewUserReg />} />
      <Route path="/users" element={<UserS />} />
    </Routes>
  </Router>
  );
}

export default App;
