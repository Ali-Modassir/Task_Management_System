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
import VE_Workspace from "./Dashboard/views/Workspace/VE_Workspace";

//AdminPanel
import AdminPanel from "./AdminPanel/AdminPanel";
import AdminTaskTable from "./AdminPanel/AdminTaskTable";

const App = () => {
  //Context
  const {
    token,
    login,
    logout,
    userId,
    userType,
    userName,
    userEmail,
    googleLogin,
  } = useAuth();
  const {
    allTasks,
    setAllTasksHandler,
    allComments,
    commentsHandler,
    allUsers,
    setAllUsersHandler,
    VE_details,
  } = useTaskHook();

  //Checks if user as token then it will render particular routes

  let routes;
  if (token) {
    routes = (
      <Router>
        <Switch>
          <Route path="/VE/dash/:id">
            <VE_Workspace />
          </Route>
          <Route path="/dash">
            <DashLayout />
          </Route>
          <Route path="/admin/:userId" exact>
            <AdminTaskTable />
          </Route>
          <Route path="/admin" exact>
            <AdminPanel />
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
          <Route path="/admin" exact>
            <AdminPanel />
          </Route>
          <Route path="/VE/dash/:id">
            <VE_Workspace />
          </Route>
          <Route path="/admin/:userId" exact>
            <AdminTaskTable />
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
          userId: userId,
          userType: userType,
          logout: logout,
          login: login,
          googleLogin: googleLogin,
        }}
      >
        <TaskContext.Provider
          value={{
            allTasks,
            allComments,
            setAllTasksHandler,
            commentsHandler,
            allUsers,
            VE_details,
            setAllUsersHandler,
          }}
        >
          <main>{routes}</main>
        </TaskContext.Provider>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
