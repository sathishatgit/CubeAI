// src/components/SignIn.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const userLogin = async (emailId, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {
        emailId,
        password,
      });
      console.log(response);
      setMessage("User signed in successfully!");
      setSeverity("success");
      setOpen(true);
      setTimeout(() => navigate(`/home/${emailId}`), 2000); // Redirect to home page after 2 seconds
    } catch (error) {
      setMessage("Sign-in failed. Please try again.");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emailId, password } = formData;
    if (emailId && password) {
      userLogin(emailId, password);
    } else {
      setMessage("Please fill in both fields.");
      setSeverity("warning");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="emailId"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={formData.emailId}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>
      <Typography variant="body2" align="center" margin="normal">
        Don't have an account?{" "}
        <Link component="button" onClick={() => navigate("/signup")}>
          Sign Up
        </Link>
      </Typography>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignIn;
