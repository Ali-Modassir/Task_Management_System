import React from "react";

//Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Notifications from "react-notify-toast"; //For pop-up notification

//Contexts-------------------------------------------
import { AuthContext } from "./TMS/context/authContext";
import { TaskContext } from "./TMS/context/taskContext";

//hooks----------------------------------------------
import { useAuth } from "./TMS/customHooks/auth-hook";
import { useTaskHook } from "./TMS/customHooks/task-hook";

//TMS Views -----------------------------------------------------------------------------------------

//Authentication--------------------------------------------------
import Authentication from "./TMS/Authentication/Pages/Authentication";
import GoogleLogin from "./TMS/Authentication/Pages/GoogleLogin";
import ConfirmEmail from "./TMS/Authentication/Pages/ConfirmEmail";
import ResetPswd from "./TMS/Authentication/Pages/ResetPswd";

//Dashboard------------------------------------------------
import DashLayout from "./TMS/Dashboard/layouts/DashLayout";
import VE_Workspace from "./TMS/Dashboard/views/Workspace/VE_Workspace";

//AdminPanel---------------------------------------
import AdminPanel from "./TMS/AdminPanel/AdminPanel";
import AdminTaskTable from "./TMS/AdminPanel/AdminTaskTable";

//-------------------------------------------------------------------------------------------------

//Encomecs views----------------------------------------------------------
import Home from "./Encomece/views/Home";
import StartupProgram from "./Encomece/views/StartupProgram";
import VEProgram from "./Encomece/views/VEProgram";

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
          <Redirect to="/dash" exact />
        </Switch>
      </Router>
    );
  } else {
    routes = (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/ve_program" exact>
            <VEProgram />
          </Route>
          <Route path="/startup_program" exact>
            <StartupProgram />
          </Route>
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
          <Redirect to="/" exact />
        </Switch>
      </Router>
    );
  }

  return (
    <>
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
    </>
  );
};

export default App;
