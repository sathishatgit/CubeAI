import { Button } from "@mui/material";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>Email: {email}</p>
      <Button
        onClick={() => navigate("/")}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Log Out
      </Button>
    </div>
  );
};

export default Home;
