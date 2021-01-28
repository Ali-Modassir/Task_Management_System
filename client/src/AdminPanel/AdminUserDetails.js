import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useHttpClient } from "../customHooks/http-hook";
import { VE_Data } from "./VE_Data/VE_Data";

const AdminUserDetails = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [assignedValue, setAssignedValue] = useState(null);
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    const cb = async () => {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL +
          "/dashboard/workspace/allUsers/" +
          userId
      );
      const json = await response.json();
      setTasks(json.tasks);
      setUserName(json.userName);
    };
    cb();
  }, []);

  useEffect(() => {}, [assignedValue]);

  //Converting Date-String to human readable
  const dateHandler = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
    tableHeader: {
      fontSize: "30px",
    },
  });

  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {userName}
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>
                <Typography>Sl.No</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Task Name</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Task Type</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Due Date</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Task Description</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Status</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Assign</Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <StyledTableRow key={task.taskId}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {task.taskName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {task.taskType.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dateHandler(task.dueDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {task.taskDescription}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {task.status ? "Done" : "Pending"}
                </StyledTableCell>
                <StyledTableCell align="center">Assign</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Autocomplete
        id="controlled-demo"
        value={assignedValue}
        options={VE_Data}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setAssignedValue(newValue);
        }}
        style={{ width: 300, marginTop: "20px" }}
        renderInput={(params) => <TextField {...params} label="Assign To" />}
      />
    </>
  );
};

export default AdminUserDetails;
