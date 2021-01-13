import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../context/authContext";

//Material-ui-core-component
import { Card, Avatar, Button, CardContent } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

//Style
import "./Dashboard.css";

export default function Dashboard() {
  const auth = useContext(AuthContext);

  //on clicking create workspace
  const history = useHistory();
  const createWorkspace = () => {
    history.push("/dash/workspace");
  };

  return (
    <>
      <Card className="profileCard">
        <div className="cardHeader">
          <h3>Profile Details</h3>
        </div>
        <CardContent>
          <div className="cardBody">
            <Avatar
              src="/broken-image.jpg"
              style={{
                width: "130px",
                height: "130px",
                margin: "0 30px 0 30px",
                border: "2px solid rgb(255, 2, 107)",
              }}
            />
            <div className="profileDetails">
              <h3>{auth.userName}</h3>
              <h4>{auth.userEmail}</h4>
              <div>
                <Button variant="contained" color="secondary">
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workspace-Button */}

      <div id="icon" onClick={createWorkspace}>
        <AddIcon
          className="workspace-icon"
          style={{ height: "50px", width: "50px", paddingTop: "10px" }}
        />
        <div className="label">WORKSPACE</div>
      </div>
    </>
  );
}
