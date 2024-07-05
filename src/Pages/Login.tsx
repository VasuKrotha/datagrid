import React, { useState, useEffect } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../Storage/Localstorage";
export const Login: React.FC = () => {
  interface Logindata {
    username: string;
    email: string;
    password: string;
  }
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [logindata, setData] = useState<Logindata[]>([]);
  const navigation = useNavigate();
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(username);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return false;
    } else {
      const newLoginData = { username, email, password };
      const users = getFromLocalStorage("users") || [];
      users.push(newLoginData);
      setData([...logindata, newLoginData]);
      saveToLocalStorage("users", newLoginData);

      navigation("/home");
      setName("");
      setEmail("");
      setPassword("");
      return true;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className="container">
        <Typography
          className="title"
          component="h1"
          variant="h5"
          style={{ marginTop: "20px", fontSize: "50px", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handlesubmit}
          noValidate
          className="form"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="submitButton">
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};
