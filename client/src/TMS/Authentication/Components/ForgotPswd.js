import React, { Fragment, useState } from "react";
import { notify } from "react-notify-toast"; //For pop-up notification
import { Formik, Form, Field } from "formik"; //Using Formik
import * as Yup from "yup";
//Material-UI
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
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
    <>
      <div className="auth-forgot-pswd-container">
        <h2 style={{ fontFamily: "Ubuntu" }}>Forgot your password ?</h2>
        <div className="auth-forgot-password-text">
          To reset your password, please enter the email address of your
          account.
        </div>
      </div>
      <div className="auth-forgot-pswd-form">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
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
              {isLoading && (
                <div>
                  <br />
                  <LinearProgress />
                  <br />
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                fullWidth
                style={{ margin: "20px 0 10px 0" }}
              >
                Reset My Password
              </Button>
              <br />
              {!!successMessage && (
                <Alert severity="success" style={{ margin: "20px 0 10px 0" }}>
                  {successMessage}
                </Alert>
              )}
              {!!errorMessage && (
                <Alert severity="error" style={{ margin: "20px 0 10px 0" }}>
                  {errorMessage &&
                    (errorMessage.length > 200
                      ? "Signup Attempt Failed"
                      : errorMessage)}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ResetPswd;
