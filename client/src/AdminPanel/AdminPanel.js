import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
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
} from "@material-ui/core";
import { TaskContext } from "../context/taskContext";

const AdminPanel = () => {
  const { allUsers, setAllUsersHandler } = useContext(TaskContext);
  const history = useHistory();

  useEffect(() => {
    const cb = async () => {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/dashboard/workspace/allUsers"
      );
      const json = await response.json();
      setAllUsersHandler(json);
    };
    cb();
  }, []);

  const detailsHandler = (id) => {
    history.push("/admin/" + id);
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
            Admin Panel
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
                <Typography>User Name</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>User Email</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Total Active Task</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Details</Typography>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user, index) => (
              <StyledTableRow key={user.userId}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.userName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.userEmail}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.tasks.length}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    onClick={() => detailsHandler(user.userId)}
                    style={{ cursor: "pointer" }}
                  >
                    Click to get Details
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminPanel;
