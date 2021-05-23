import React, { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { notify } from "react-notify-toast"; //For pop-up notification at top
//Using Formik for rendering Forms
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
//Material-UI
import { TextField, Switch } from "formik-material-ui";
import {
  Button,
  LinearProgress,
  Typography,
  Link,
  Grid,
  FormControlLabel,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//CSS
import "../Styles/Authentication.css";

import { useHttpClient } from "../../customHooks/http-hook"; //custom-hook for http work
import { AuthContext } from "../../context/authContext"; //context

const AuthForm = () => {
  const auth = useContext(AuthContext); //Context
  const { sendRequest, isLoading } = useHttpClient(); //Http-Custom-hook
  const history = useHistory();

  //States
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //Switching between login to Signup handler
  const switchModeHandler = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoginMode((prevMode) => !prevMode);
  };

  //Form Submit Handler
  const authSubmitHandler = (values, { setSubmitting }) => {
    setTimeout(async () => {
      setSubmitting(false);
      const data = JSON.stringify(values, null, 2);
      if (isLoginMode) {
        //Login-Form
        try {
          setErrorMessage(null);
          setSuccessMessage(null);
          const response = await sendRequest(
            process.env.REACT_APP_BASE_URL + "/login",
            "POST",
            data,
            {
              "Content-Type": "application/json",
            }
          );
          if (response.ok) {
            setSuccessMessage(response.message);
            notify.show(response.message, "success");
            auth.login(
              response.userType,
              response.userName,
              response.userEmail,
              response.userId,
              response.token
            );
            history.push("/dash");
          } else {
            setErrorMessage(response.message);
            notify.show(response.message, "warning");
          }
        } catch (error) {
          console.log(error.message);
          setErrorMessage(error.message);
        }
      } else {
        //Signup Form
        try {
          setErrorMessage(null);
          setSuccessMessage(null);
          const response = await sendRequest(
            process.env.REACT_APP_BASE_URL + "/signup",
            "POST",
            data,
            {
              "Content-Type": "application/json",
            }
          );
          if (response.ok) {
            setSuccessMessage(response.message);
            notify.show(response.message, "success");
          } else {
            setErrorMessage(response.message);
            notify.show(response.message, "error");
          }
        } catch (error) {
          console.log(error.message);
          setErrorMessage(error.message);
        }
      }
    }, 500);
  };

  //Form Initial Values
  const formInitialValues = {
    name: "",
    email: "",
    password: "",
    VE_Employee: false,
  };

  //Validation-Schema
  const validationSchemaSignup = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required!"),
    email: Yup.string().email("Invalid email!").required("Required!"),
    password: Yup.string()
      .required("Please Enter your Password!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });
  const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Required!"),
    password: Yup.string().required("Please Enter your Password!"),
  });

  //Formik-Form
  return (
    <Fragment>
      <Grid align="center">
        <Typography variant="h4" style={{ margin: "20px auto" }}>
          {isLoginMode ? "Log in" : "Sign up"}
        </Typography>
      </Grid>
      <Formik
        initialValues={formInitialValues}
        validationSchema={
          isLoginMode ? validationSchemaLogin : validationSchemaSignup
        }
        onSubmit={authSubmitHandler}
      >
        {({ submitForm, isSubmitting }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
              {!isLoginMode && (
                <div className="auth-feild">
                  <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Username"
                    helperText="Please Enter Username"
                    fullWidth
                  />
                </div>
              )}
              <div className="auth-feild">
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  helperText="Please Enter Email"
                  fullWidth
                />
              </div>
              <div className="auth-feild">
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth
                />
              </div>
              <div className="auth-feild">
                <FormControlLabel
                  control={
                    <Field
                      component={Switch}
                      type="checkbox"
                      name="VE_Employee"
                    />
                  }
                  label="Check if Encomece V.E"
                />
              </div>
              {isLoading && (
                <div>
                  <br />
                  <LinearProgress />
                  <br />
                </div>
              )}
              <div className="auth-feild">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  fullWidth
                >
                  {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
                {!!successMessage && (
                  <Alert severity="success" style={{ margin: "20px 0 0 0" }}>
                    {successMessage}
                  </Alert>
                )}
                {!!errorMessage && (
                  <Alert severity="error" style={{ margin: "20px 0 0 0" }}>
                    {errorMessage &&
                      (errorMessage.length > 200
                        ? "Signup Attempt Failed"
                        : errorMessage)}
                  </Alert>
                )}
              </div>
            </Form>
            <div className="auth-toogle-text">
              {" "}
              {isLoginMode ? "Do you" : "Already"} have an account ?{"   "}
              <Link
                href="#"
                onClick={switchModeHandler}
                style={{ marginLeft: "5px" }}
              >
                {isLoginMode ? "Sign up" : "Login"}
              </Link>
            </div>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Fragment>
  );
};

export default AuthForm;
