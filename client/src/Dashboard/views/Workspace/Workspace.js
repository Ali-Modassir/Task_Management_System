import React, { useContext } from "react";

//Material-ui-core Elements
import { Card, CardContent } from "@material-ui/core";

import FormContainer from "./Components/FormContainer";
import TaskList from "./Components/TaskList";
import { AuthContext } from "../../../context/authContext";

//Style
import "./Workspace.css";
import VE_myTasks from "./Components/VE_myTasks";

const Workspace = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {auth.userType === "client" && (
        <Card className="workspaceCard">
          <div className="workspaceCardHeading">
            <h3>Create Task</h3>
          </div>
          <CardContent>
            <div className="workspaceCardBody">
              <FormContainer />
            </div>
          </CardContent>
        </Card>
      )}
      <br />
      <Card className="workspaceCard">
        <div className="workspaceCardHeading">
          <h3>My Task</h3>
        </div>
        <CardContent>
          <div className="workspaceCardBody">
            {auth.userType === "client" ? <TaskList /> : <VE_myTasks />}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Workspace;
