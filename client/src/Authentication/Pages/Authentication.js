import React, { useState } from "react";

//CSS
import "./Authentication.css";

//Material-UI
import {
  Grid,
  Paper,
  Avatar,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//-------

import FormikAuthForm from "../Components/FormikAuthForm";
import ForgotPswd from "../Components/ForgotPswd";
//Login Details
const Login = () => {
  //States
  const [resetPswd, setResetPswd] = useState(false);

  //toogle to reset and vice-versa
  const toggleComponent = () => {
    setResetPswd((prevMode) => !prevMode);
  };

  return (
    <Grid>
      <Paper elevation={15} className="login_container">
        <Grid align="center">
          <Avatar style={{ backgroundColor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        {!resetPswd ? (
          <Grid>
            <FormikAuthForm />
            <Typography style={{ margin: "0 0 10px auto" }}>
              <Link href="#" onClick={toggleComponent}>
                Forgot password ?
              </Link>
            </Typography>
            <hr />
          </Grid>
        ) : (
          <ForgotPswd />
        )}
        {resetPswd && (
          <Button
            variant="contained"
            fullWidth
            style={{ margin: "20px 0 0 0" }}
            onClick={toggleComponent}
          >
            Go to Login
          </Button>
        )}
        {!resetPswd && (
          <Button
            className="btn"
            variant="contained"
            fullWidth
            style={{ margin: "20px auto", display: "flex" }}
          >
            <Link
              href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FcGoogle style={{ fontSize: "large", marginRight: "5px" }} />
              Continue with Google
            </Link>
          </Button>
        )}
      </Paper>
    </Grid>
  );
};

export default Login;
