import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { notify } from "react-notify-toast";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Box,
} from "@material-ui/core";

// import { VE_Data } from "./VE_Data/VE_Data";
import { useHttpClient } from "../customHooks/http-hook";
import { TaskContext } from "../context/taskContext";

const AdminTaskTable = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [assignedValue, setAssignedValue] = useState(null);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [select, setSelection] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();

  const { VE_details } = useContext(TaskContext);

  useEffect(() => {
    const cb = async () => {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL +
          "/dashboard/workspace/allUsers/" +
          userId
      );
      const json = await response.json();
      if (json) {
        json.tasks.map &&
          json.tasks.map((task) => {
            return (task.dueDate = dateHandler(task.dueDate));
          });
        setTasks(json.tasks);
        setUserName(json.userName);
        setUserEmail(json.userEmail);
      }
    };
    cb();
  }, []);

  const sendTaskDetails = async () => {
    const getTaskDetails = tasks.filter((task) => {
      return select.rowIds[0] == task.id;
    });
    const data = {
      ...assignedValue,
      ...getTaskDetails[0],
      assignUserId: userId,
      assignUserName: userName,
      assignUserEmail: userEmail,
    };
    console.log(data);
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BASE_URL + "/dashboard/workspace/sendTask",
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        }
      );
      notify.show(response.message, "success");
    } catch (err) {
      console.log(err);
    }
  };

  //Converting Date-String to human readable
  const dateHandler = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const columns = [
    { field: "id", headerName: "Sl.No", width: 100 },
    { field: "taskName", headerName: "Task Name", width: 330 },
    { field: "taskType", headerName: "Task Type", width: 330 },
    { field: "taskDescription", headerName: "Task Description", width: 350 },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 330,
    },
    { field: "assigned_VE_Name", headerName: "Assigned To", width: 300 },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{userName}</Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          pageSize={5}
          checkboxSelection
          hideFooterPagination
          onSelectionChange={(newSelection) => {
            setSelection(newSelection);
          }}
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <Box margin={2}>
          <Autocomplete
            id="controlled-demo"
            value={assignedValue}
            options={VE_details}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setAssignedValue(newValue);
            }}
            style={{ width: 400, marginTop: "20px" }}
            renderInput={(params) => (
              <TextField {...params} label="Assign To" />
            )}
          />
        </Box>
        {isLoading && <LinearProgress style={{ width: 400 }} />}
        <Box margin={2}>
          <Button
            color="secondary"
            style={{ marginTop: "10px" }}
            onClick={sendTaskDetails}
            variant="outlined"
          >
            Assign
          </Button>
        </Box>
      </div>
    </>
  );
};

export default AdminTaskTable;
