import React from "react";

//Material-ui-core Elements
import { Card, CardContent } from "@material-ui/core";

import FormContainer from "./Components/FormContainer";
import TaskList from "./Components/TaskList";

//Style
import "./Workspace.css";

const Workspace = () => {
  return (
    <>
      <Card className="workspaceCard">
        <div className="workspaceCardHeading">
          <h3> My Tasks</h3>
        </div>
        <CardContent>
          <div className="workspaceCardBody">
            <FormContainer />
          </div>
        </CardContent>
      </Card>
      <br />
      <Card className="workspaceCard">
        <div className="workspaceCardHeading">
          <h3> Task List</h3>
        </div>
        <CardContent>
          <div className="workspaceCardBody">
            <TaskList />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Workspace;
