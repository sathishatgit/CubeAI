// src/components/SignUp.js
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

const SignUp = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailId, password, confirmPassword, mobileNumber } = formData;
    if (emailId && password && password === confirmPassword && mobileNumber) {
      try {
        const response = await axios.post("http://localhost:5000/user/signup", {
          emailId,
          password,
          mobileNumber,
        });
        setMessage("User signed up successfully!");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => navigate("/signin"), 2000); // Redirect to sign-in page after 2 seconds
      } catch (error) {
        setMessage("Signup failed. Please try again.");
        setSeverity("error");
        setOpen(true);
      }
    } else {
      setMessage(
        "Please make sure the passwords match and all fields are filled."
      );
      setSeverity("warning");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="emailId"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={formData.emailId}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          variant="outlined"
          type="password"
          fullWidth
          required
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <TextField
          label="Mobile Number"
          name="mobileNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" align="center" margin="normal">
        Already have an account?{" "}
        <Link component="button" onClick={() => navigate("/signin")}>
          Sign In
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

export default SignUp;
