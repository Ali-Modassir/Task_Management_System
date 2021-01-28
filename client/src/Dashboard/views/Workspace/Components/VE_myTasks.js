import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../context/authContext";
import { useHttpClient } from "../../../../customHooks/http-hook";
import { Formik, Form, Field } from "formik"; //Using Formik
import { TextField } from "formik-material-ui";
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
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { TaskContext } from "../../../../context/taskContext";

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

const VE_myTasks = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  const [taskList, setTaskList] = useState([]);
  const [expanded, setExpanded] = useState("");
  const taskContext = useContext(TaskContext);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  //Getting all tasks
  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_BASE_URL +
        "/dashboard/workspace/VE/task/" +
        auth.userId
    )
      .then((res) => setTaskList(res))
      .catch((err) => console.log(err));
  }, [taskContext.allTasks, taskContext.allComments]);

  //Submitting comment form
  const onSubmit = (taskId, assignUserId) => (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      const formData = JSON.stringify(values, null, 2);
      var data = JSON.parse(formData);
      data = {
        ...data,
        userId: auth.userId,
        person: auth.userName,
        taskId: taskId,
        assignUserId: assignUserId,
        type: "ve",
      };
      data = JSON.stringify(data);
      console.log(data);
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

  //Converting Date-String to human readable
  const dateHandler = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (taskList.ok === false) {
    return <Typography variant="h6">No Task Assigned</Typography>;
  } else {
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
                            <TableCell align="center">
                              Task Description
                            </TableCell>
                            <TableCell align="center">Assigned On</TableCell>
                            <TableCell align="center">Due Date</TableCell>
                            <TableCell align="center">Assigned By</TableCell>
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
                              {dateHandler(task.assignedOn)}
                            </TableCell>
                            <TableCell align="center">
                              {dateHandler(task.dueDate)}
                            </TableCell>
                            <TableCell align="center">
                              {task.assignUserName}
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
                      onSubmit={onSubmit(task.taskId, task.assignUserId)}
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
  }
};

export default VE_myTasks;
