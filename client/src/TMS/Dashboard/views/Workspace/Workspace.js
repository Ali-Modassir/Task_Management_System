import React, { useContext } from "react";

import FormContainer from "./Components/FormContainer";
import { AuthContext } from "../../../context/authContext";
import MyTask from "./Components/MyTask/MyTask";

const Workspace = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      {auth.userType === "client" && (
        <div className="dash-workspace-card">
          <div className="dash-workspace-innerContent">
            <div className="dash-workspace-cardHeading">
              <span>Create Task</span>
            </div>
            <div className="dash-workspace-cardContent">
              <FormContainer />
            </div>
          </div>
        </div>
      )}
      <MyTask />
    </>
  );
};

export default Workspace;
