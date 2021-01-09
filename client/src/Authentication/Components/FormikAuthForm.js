import React, { useState, useContext, Fragment } from "react";
import { notify } from "react-notify-toast"; //For pop-up notification at top
//Using Formik for rendering Forms
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
//Material-UI
import { TextField } from "formik-material-ui";
import {
  Button,
  LinearProgress,
  Typography,
  Link,
  Grid,
  Box,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useHttpClient } from "../../customHooks/http-hook"; //custom-hook for http work
import { AuthContext } from "../../context/authContext"; //context

const AuthForm = () => {
  const auth = useContext(AuthContext); //Context
  const { sendRequest, isLoading } = useHttpClient(); //Http-Custom-hook

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
            auth.login(response.userId, response.token);
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
                <Box margin={1}>
                  <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Username"
                    helperText="Please Enter Username"
                    fullWidth
                  />
                </Box>
              )}
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  helperText="Please Enter Email"
                  fullWidth
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth
                />
              </Box>

              {isLoading && <LinearProgress />}
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  fullWidth
                  style={{ margin: "10px 0 0 0" }}
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
                    {errorMessage}
                  </Alert>
                )}
              </Box>
            </Form>
            <Typography style={{ margin: "20px 0 2px auto" }}>
              {" "}
              {isLoginMode ? "Do you" : "Already"} have an account ?{" "}
              <Link href="#" onClick={switchModeHandler}>
                {isLoginMode ? "Sign up" : "Login"}
              </Link>
            </Typography>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    </Fragment>
  );
};

export default AuthForm;
