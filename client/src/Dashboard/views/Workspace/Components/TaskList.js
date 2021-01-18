import React, { useState, useEffect, useContext } from "react";

import { Formik, Form, Field } from "formik"; //Using Formik
import { TextField } from "formik-material-ui";

//Material-ui-core components
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
  LinearProgress,
} from "@material-ui/core";
//Icons
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import DetailsIcon from "@material-ui/icons/Details";

//Context
import { AuthContext } from "../../../../context/authContext";
import { TaskContext } from "../../../../context/taskContext";

//Custom Hooks
import { useHttpClient } from "../../../../customHooks/http-hook";

const TaskList = () => {
  //Using context for state update
  const auth = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  //Storing-List-of-Tasks
  const [taskList, setTasksList] = useState([]);

  //Custom hook for all http work
  const { sendRequest, isLoading } = useHttpClient();

  //State used for adding comment section
  const [detailsShow, setDetailsShow] = useState(false);
  const [clickedTaskId, setClickedTaskId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  //Fetching all tasks from mongodb using a custom-hook
  useEffect(() => {
    let mounted = true;
    sendRequest(
      "http://localhost:8000/api/dashboard/workspace/allTasks/" + auth.userId
    )
      .then((response) => {
        if (mounted) {
          setTasksList(response);
        }
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, [taskContext.allTasks, taskContext.allComments]);

  //Toogle Comment-Section
  const toggleDrawer = (id, index) => {
    setDetailsShow(!detailsShow);
    setClickedTaskId(id);
    setCurrentIndex(index);
  };

  //Converting Date-String to human readable
  const dateHandler = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //Post request to mongodb for storing comments
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      const formData = JSON.stringify(values, null, 2);
      var data = JSON.parse(formData);
      data = { ...data, taskId: clickedTaskId, userId: auth.userId };
      data = JSON.stringify(data);
      sendRequest(
        "http://localhost:8000/api/dashboard/workspace/task/comments",
        "POST",
        data,
        {
          "Content-Type": "application/json",
        }
      )
        .then((response) => {
          if (response.ok) {
            taskContext.commentsHandler(response.comment);
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  return (
    <React.Fragment>
      {isLoading && <CircularProgress />}
      {!!taskList === false ? (
        <Typography>No Task Assigned</Typography>
      ) : (
        <div className="TaskList">
          {taskList.map &&  taskList.map((task, index) => {
            return (
              <div className="taskItem">
                <List component="nav">
                  <ListItem key={index}>
                    <ListItemIcon
                      onClick={() => toggleDrawer(task.taskId, index)}
                    >
                      <AssignmentOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText style={{ marginRight: "30px" }}>
                      {task.taskName}
                    </ListItemText>
                    <ListItemText style={{ marginRight: "30px" }}>
                      {task.taskType.title}
                    </ListItemText>
                    <ListItemText style={{ marginRight: "30px" }}>
                      {dateHandler(task.dueDate)}
                    </ListItemText>
                    <ListItemIcon
                      // style={{ : "30px" }}
                      onClick={() => toggleDrawer(task.taskId, index)}
                    >
                      Details <DetailsIcon />
                    </ListItemIcon>
                  </ListItem>

                  {detailsShow && currentIndex === index && (
                    <div className="taskDetails">
                      <Box margin={1}>
                        <div className="details">
                          <Typography>
                            Description : {task.taskDescription}
                          </Typography>
                        </div>
                      </Box>
                      <List component="nav">
                        {task.taskComments.map((comment, index) => {
                          return (
                            <ListItem key={index}>
                              <ListItemText>{comment.person}</ListItemText>
                              <ListItemText>{comment.comment}</ListItemText>
                              <ListItemText>
                                {dateHandler(comment.time)}
                              </ListItemText>
                            </ListItem>
                          );
                        })}
                      </List>
                      <Formik
                        initialValues={{ comment: "" }}
                        onSubmit={onSubmit}
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
                              <Box margin={1}>
                                {isLoading && <LinearProgress />}
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
                  )}
                </List>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default TaskList;
