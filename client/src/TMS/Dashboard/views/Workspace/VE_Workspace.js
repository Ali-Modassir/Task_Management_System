import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../../customHooks/http-hook";
import { AuthContext } from "../../../context/authContext";
import { notify } from "react-notify-toast";

const VE_Workspace = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const { id } = useParams();
  const ids = id.split("=");
  const [taskData, setTaskData] = useState({
    assignUserId: ids[0],
    assignTaskId: ids[1],
    userId: ids[2],
  });

  const history = useHistory();

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_BASE_URL + "/dashboard/workspace/VE/addTask",
      "POST",
      JSON.stringify(taskData),
      {
        "Content-Type": "application/json",
      }
    )
      .then((res) => {
        notify.show(res.message, "success");
        if (res.message) {
          history.push("/dash");
        }
      })
      .catch((err) => console.log(err));
  }, [taskData]);

  return <div>VE Workspace</div>;
};

export default VE_Workspace;
