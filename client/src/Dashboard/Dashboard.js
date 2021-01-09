import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    auth.logout();
    history.push("/auth");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="contained" color="primary" onClick={logoutHandler}>
        LOGOUT
      </Button>
    </div>
  );
};

export default Dashboard;
