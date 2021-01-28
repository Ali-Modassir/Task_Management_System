import React, { useState, useEffect, useContext } from "react";

import { Formik, Form, Field } from "formik"; //Using Formik
import { TextField } from "formik-material-ui";

//Material-ui-core components
import {
  LinearProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  withStyles,
  Typography,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
//Icons
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import DetailsIcon from "@material-ui/icons/Details";
import ListIcon from "@material-ui/icons/List";

//Context
import { AuthContext } from "../../../../context/authContext";
import { TaskContext } from "../../../../context/taskContext";

//Custom Hooks
import { useHttpClient } from "../../../../customHooks/http-hook";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const TaskList = () => {
  //Using context for state update
  const auth = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  //States
  const [taskList, setTasksList] = useState([]);
  const [expanded, setExpanded] = useState("");

  //Custom hook for all http work
  const { sendRequest, isLoading } = useHttpClient();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //Fetching all tasks from mongodb using a custom-hook
  useEffect(() => {
    let mounted = true;
    sendRequest(
      process.env.REACT_APP_BASE_URL +
        "/dashboard/workspace/allTasks/" +
        auth.userId
    )
      .then((response) => {
        if (mounted) {
          setTasksList(response);
        }
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, [taskContext.allTasks, taskContext.allComments]);

  //Converting Date-String to human readable
  const dateHandler = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //Post request to mongodb for storing comments
  const onSubmit = (assigned_VE_Id) => (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      const formData = JSON.stringify(values, null, 2);
      var data = JSON.parse(formData);
      data = {
        ...data,
        taskId: assigned_VE_Id,
        userId: auth.userId,
        assigned_VE_Id: assigned_VE_Id,
        person: auth.userName,
        type: "client",
      };
      data = JSON.stringify(data);
      sendRequest(
        "http://localhost:8000/api/dashboard/workspace/task/comments",
        "POST",
        data,
        {
          "Content-Type": "application/json",
        }
      )
        .then((response) => taskContext.commentsHandler(response.comments))
        .catch((err) => console.log(err));
    }, 500);
  };

  return (
    <div>
      {taskList.map &&
        taskList.map((task, index) => {
          return (
            <Accordion
              square
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary>
                <Typography>{task.taskType}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Task Name</TableCell>
                          <TableCell align="center">Task Description</TableCell>
                          <TableCell align="center">Due Date</TableCell>
                          <TableCell align="center">Assigned To</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={task.taskId}>
                          <TableCell component="th" scope="row">
                            {task.taskName}
                          </TableCell>
                          <TableCell align="center">
                            {task.taskDescription}
                          </TableCell>
                          <TableCell align="center">
                            {dateHandler(task.dueDate)}
                          </TableCell>
                          <TableCell align="center">
                            {task.assigned_VE_Email
                              ? task.assigned_VE_Email
                              : "Not Assigned"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box margin={2}>
                    <Typography variant="h6" color="secondary">
                      Start Conversation
                    </Typography>
                  </Box>
                  {task.taskComments.length != 0 && (
                    <>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>User</TableCell>
                              <TableCell align="center">Comment</TableCell>
                              <TableCell align="center">Time</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {task.taskComments.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell>{row.person}</TableCell>
                                <TableCell align="center">
                                  {row.comment}
                                </TableCell>
                                <TableCell align="center">
                                  {dateHandler(row.time)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  )}
                  <Formik
                    initialValues={{ comment: "" }}
                    onSubmit={onSubmit(task.taskId, task.assigned_VE_Id)}
                  >
                    {({ submitForm, isSubmitting }) => (
                      <Form>
                        <div className="formContainer">
                          <Box margin={1}>
                            <Field
                              component={TextField}
                              name="comment"
                              type="text"
                              fullWidth
                              label="Add a comment"
                            />
                          </Box>
                          {isLoading && <LinearProgress color="secondary" />}
                          <Box margin={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={isSubmitting}
                              onClick={submitForm}
                              style={{ margin: "10px 0 0 0" }}
                            >
                              Comment
                            </Button>
                          </Box>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export default TaskList;
