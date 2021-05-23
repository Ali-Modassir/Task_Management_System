import React, { useState } from "react";

import "../Styles/Authentication.css";
import auth_logo from "../../assets/img/auth_logo.svg";
import brand from "../../assets/img/brand.svg";
import Brand_logo from "../../assets/img/logo.png";

import { Grid, Button, Typography, Link } from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";

import FormikAuthForm from "../Components/FormikAuthForm";
import ForgotPswd from "../Components/ForgotPswd";
//Login Details

const Authentication1 = () => {
  //States
  const [resetPswd, setResetPswd] = useState(false);

  //toogle to reset and vice-versa
  const toggleComponent = () => {
    setResetPswd((prevMode) => !prevMode);
  };

  return (
    <div className="authContainer">
      <div className="auth-formContainer">
        <div className="auth-log">
          <img src={auth_logo} alt="auth_logo" />
        </div>
        {!resetPswd ? (
          <div className="auth-forms">
            <FormikAuthForm />
            <div className="auth-forgot-pswd">
              <Link href="#" onClick={toggleComponent}>
                Forgot password ?
              </Link>
            </div>
          </div>
        ) : (
          <ForgotPswd />
        )}
        {resetPswd && (
          <Button
            variant="contained"
            onClick={toggleComponent}
            style={{ margin: "10px 0 25px 0", width: "75%" }}
          >
            Go to Login
          </Button>
        )}
        {!resetPswd && (
          <button className="auth-google-btn">
            <Link
              href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FcGoogle style={{ fontSize: "large", marginRight: "5px" }} />
              <span>Continue with Google</span>
            </Link>
          </button>
        )}
      </div>
      <div className="brandContainer">
        <img src={Brand_logo} alt="brand_logo" />
      </div>
    </div>
  );
};

export default Authentication1;
