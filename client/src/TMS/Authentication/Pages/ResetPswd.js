import React, { Fragment, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { notify } from "react-notify-toast"; //For pop-up notification at top
//Formik imports
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
//Material-UI
import { Button, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "../Styles/Authentication.css";

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
    <>
      <div className="auth-change-pswd-container">
        <h2 style={{ fontFamily: "Ubuntu" }}>Forgot your password ?</h2>
        <div className="auth-forgot-password-text">
          Please Enter your new Password
        </div>
        <div className="auth-forgot-pswd-form">
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <div className="auth-feild">
                  <Field
                    component={TextField}
                    name="password"
                    type="password"
                    label="New Password"
                    helperText="Please Enter New Password"
                    fullWidth
                  />
                </div>
                <div className="auth-feild">
                  <Field
                    component={TextField}
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    helperText="Please Re-enter Password"
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
                  Change Password
                </Button>
                <br />
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPswd;
