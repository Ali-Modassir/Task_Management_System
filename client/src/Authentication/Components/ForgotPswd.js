import React, { Fragment, useState } from "react";
import { notify } from "react-notify-toast"; //For pop-up notification
import { Formik, Form, Field } from "formik"; //Using Formik
import * as Yup from "yup";
//Material-UI
import { Button, Box, Typography, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Alert } from "@material-ui/lab";

//Http-custom-Hook
import { useHttpClient } from "../../customHooks/http-hook";

const ResetPswd = () => {
  const { sendRequest, isLoading } = useHttpClient();

  //States
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //ValidationSchema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email!")
      .required("Please enter your email"),
  });

  //Form-Submit-Handler
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(async () => {
      setSubmitting(false);
      const data = JSON.stringify(values, null, 2);
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BASE_URL + "/email/forgot",
          "POST",
          data,
          {
            "Content-Type": "application/json",
          }
        );
        if (response.ok) {
          setSuccessMessage(response.message);
          notify.show(response.message, "success");
        }
      } catch (err) {
        console.log(err.message);
        setErrorMessage(err.message);
        notify.show(err.message, "error");
      }
    }, 500);
  };

  return (
    <Fragment>
      <Box margin={2}>
        <h2 style={{ fontFamily: "Ubuntu" }}>Forgot your password ?</h2>
        <Typography style={{ margin: "20px auto" }}>
          To reset your password, please enter the email address of your
          account.
        </Typography>
      </Box>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
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
              {isLoading && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                fullWidth
                style={{ margin: "20px 0 0 0" }}
              >
                Reset My Password
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
    </Fragment>
  );
};

export default ResetPswd;
