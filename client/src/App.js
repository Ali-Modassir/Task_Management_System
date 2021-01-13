import React, { Fragment } from "react";
import { createBrowserHistory } from "history";

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
import { TaskContext } from "./context/taskContext";

//hooks
import { useAuth } from "./customHooks/auth-hook";
import { useTaskHook } from "./customHooks/task-hook";

//Pages
//Authentication
import Authentication from "./Authentication/Pages/Authentication";
import GoogleLogin from "./Authentication/Pages/GoogleLogin";
import ConfirmEmail from "./Authentication/Pages/ConfirmEmail";
import ResetPswd from "./Authentication/Pages/ResetPswd";

//Dashboard
import DashLayout from "./Dashboard/layouts/DashLayout";

const App = () => {
  //Context
  const {
    token,
    login,
    logout,
    userId,
    userName,
    userEmail,
    googleLogin,
  } = useAuth();
  const {
    allTasks,
    setAllTasksHandler,
    allComments,
    commentsHandler,
  } = useTaskHook();

  const hist = createBrowserHistory();

  //Checks if user as token then it will render particular routes
  let routes;
  if (token) {
    routes = (
      <Router history={hist}>
        <Switch>
          <Route path="/auth/reset/:resetToken">
            <ResetPswd />
          </Route>
          <Route path="/dash">
            <DashLayout />
          </Route>
          <Redirect from="/" to="/dash/dashboard" />
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
          userName: userName,
          userEmail: userEmail,
          logout: logout,
          login: login,
          googleLogin: googleLogin,
          userId: userId,
        }}
      >
        <TaskContext.Provider
          value={{
            allTasks,
            allComments,
            setAllTasksHandler,
            commentsHandler,
          }}
        >
          <main>{routes}</main>
        </TaskContext.Provider>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
