import React, { Fragment, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { notify } from "react-notify-toast"; //For pop-up notification at top
//Formik imports
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
//Material-UI
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  LinearProgress,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";

//custom-hook
import { useHttpClient } from "../../customHooks/http-hook";

const ResetPswd = () => {
  const { sendRequest, isLoading } = useHttpClient();

  //getting token from url
  const { resetToken } = useParams();
  const history = useHistory();

  //States
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //Form-Submit-Handler
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(async () => {
      setSubmitting(false);
      const data = JSON.stringify(values, null, 2);
      try {
        setErrorMessage(null);
        setSuccessMessage(null);
        const response = await sendRequest(
          process.env.REACT_APP_BASE_URL + "/email/reset/" + resetToken,
          "POST",
          data,
          {
            "Content-Type": "application/json",
          }
        );
        if (response.ok) {
          setSuccessMessage(response.message);
          notify.show(response.message, "success");
          history.push("/auth");
        }
      } catch (err) {
        setErrorMessage(err.message);
        notify.show(err.message);
        console.log(err);
      }
    }, 500);
  };

  //ValidationSchema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please Enter your Password!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <Fragment>
      <Grid>
        <Paper elevation={15} className="login_container">
          <Grid align="center">
            <Avatar style={{ backgroundColor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Box margin={2}>
            <h2 style={{ fontFamily: "Ubuntu" }}>Forgot your password ?</h2>
            <Typography style={{ margin: "20px auto" }}>
              Please Enter your new Password
            </Typography>
          </Box>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="New Password"
                      helperText="Please Enter New Password"
                      fullWidth
                    />
                  </Box>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      helperText="Please Re-enter Password"
                      fullWidth
                    />
                  </Box>
                  {isLoading && <LinearProgress />}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                    style={{ margin: "20px 0 0 0" }}
                  >
                    Submit
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
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default ResetPswd;
