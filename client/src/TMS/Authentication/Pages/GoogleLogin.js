import React, { useContext, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { useHttpClient } from "../../customHooks/http-hook";

//Callback --login with google
const GoogleLogin = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      console.log(token);
      sendRequest(process.env.REACT_APP_BASE_URL + "/google/" + token)
        .then((response) => {
          console.log(response);
          auth.login(
            response.userType,
            response.userName,
            response.userEmail,
            token,
            response.token
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Fragment>
      <h1>{token ? "Email Confirmed" : "Token Expired"}</h1>
    </Fragment>
  );
};

export default GoogleLogin;
