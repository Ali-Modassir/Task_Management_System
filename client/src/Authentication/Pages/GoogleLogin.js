import React, { useContext, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/authContext";

//Callback --login with google
const GoogleLogin = () => {
  const auth = useContext(AuthContext);

  let { token } = useParams();
  useEffect(() => {
    if (token) {
      auth.googleLogin(token);
    }
  }, []);

  return (
    <Fragment>
      <h1>{token ? "Email Confirmed" : "Token Expired"}</h1>
    </Fragment>
  );
};

export default GoogleLogin;
