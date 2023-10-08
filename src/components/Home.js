import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const nameChange = (e) => {
    setUserName(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = () => {
    if (userName === "Ketan" && password === "Cool@2023") {
      console.log("Go to user Dashboard");
      Navigate("/users");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <h5>Please login here to check User Dashboard</h5>
      <Input
        placeholder="User Id"
        sx={{ marginTop: "30px" }}
        onChange={nameChange}
      />
      <Input
        type="password"
        placeholder="Password"
        sx={{ marginTop: "30px" }}
        onChange={passwordChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" sx={{ marginTop: "30px" }} onClick={onLogin}>
        Log In
      </Button>
    </div>
  );
}

export default Home;
