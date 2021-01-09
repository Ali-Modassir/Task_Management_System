import React, { Fragment } from "react";

//Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Notifications from "react-notify-toast"; //For pop-up notification

//Contexts
import { AuthContext } from "./context/authContext";

//hooks
import { useAuth } from "./customHooks/auth-hook";

//Pages
//Authentication
import Authentication from "./Authentication/Pages/Authentication";
import GoogleLogin from "./Authentication/Pages/GoogleLogin";
import ConfirmEmail from "./Authentication/Pages/ConfirmEmail";
import ResetPswd from "./Authentication/Pages/ResetPswd";

//Dashboard
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  //Context
  const { token, login, logout, userId, googleLogin } = useAuth();

  //Checks if user as token then it will render particular routes
  let routes;
  if (token) {
    routes = (
      <Router>
        <Switch>
          <Route path="/dash" exact>
            <Dashboard />
          </Route>
          <Route path="/auth/reset/:resetToken">
            <ResetPswd />
          </Route>
          <Redirect to="/dash" />
        </Switch>
      </Router>
    );
  } else {
    routes = (
      <Router>
        <Switch>
          <Route path="/auth" exact>
            <Authentication />
          </Route>
          <Route path="/auth/reset/:resetToken" exact>
            <ResetPswd />
          </Route>
          <Route path="/auth/:token" exact>
            <GoogleLogin />
          </Route>
          <Route path="/auth/confirm/:id" exact>
            <ConfirmEmail />
          </Route>
          <Redirect to="/auth" exact />
        </Switch>
      </Router>
    );
  }

  return (
    <Fragment>
      <Notifications />
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          logout: logout,
          login: login,
          googleLogin: googleLogin,
          userId: userId,
        }}
      >
        <main>{routes}</main>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
