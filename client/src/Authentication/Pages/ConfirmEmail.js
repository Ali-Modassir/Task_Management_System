import React, { useState, useEffect, useContext } from "react";
import { notify } from "react-notify-toast";
import { useParams } from "react-router-dom";
import { CircularProgress, Box } from "@material-ui/core";

//Context
import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/http-hook";

const ConfirmEmail = () => {
  //Context
  const auth = useContext(AuthContext);

  //Custom-http-Hook
  const { sendRequest, isLoading } = useHttpClient();

  //Getting token from url
  const params = useParams();

  //States
  const [userId, setUserId] = useState(params.id);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const cb = async () => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/email/confirm/${params.id}`
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
        } else {
          setErrorMessage(response.message);
          notify.show(response.message, "error");
        }
      } catch (err) {
        setErrorMessage(err.message);
        notify.show(err.message, "error");
        setUserId(null);
      }
    };
    return cb();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box margin={10}>
      {isLoading && <CircularProgress />}
      <h3>{!!successMessage ? successMessage : errorMessage}</h3>
    </Box>
  );
};

export default ConfirmEmail;
