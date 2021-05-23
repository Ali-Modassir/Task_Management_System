import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field } from "formik"; //Using Formik
import { Autocomplete } from "formik-material-ui-lab";
import { TextField } from "formik-material-ui";

import {
  Card,
  CardContent,
  Box,
  LinearProgress,
  Button,
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import { AuthContext } from "../../../context/authContext";
import { useHttpClient } from "../../../customHooks/http-hook";
import { notify } from "react-notify-toast";

const HelpCenter = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();

  const [tasks, setTasks] = useState([]);
  const [reqTask, setreqTask] = useState(["Other"]);

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_BASE_URL +
        "/dashboard/workspace/allTasks/" +
        auth.userId
    )
      .then((res) => res.map((task) => reqTask.push(task.taskName)))
      .catch((err) => console.log(err));
  }, []);

  const initialValues = {
    task: "none",
    issueDescription: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(async () => {
      setSubmitting(false);
      var data = JSON.stringify(values, null, 2);
      data = JSON.parse(data);
      data = {
        ...data,
        email: auth.userEmail,
      };
      data = JSON.stringify(data);
      const response = await sendRequest(
        process.env.REACT_APP_BASE_URL + "/dashboard/workspace/issue",
        "POST",
        data,
        {
          "Content-Type": "application/json",
        }
      );
      if (response.ok) {
        notify.show(response.message, "success");
      } else {
        notify.show(response.message, "error");
      }
    }, 500);
  };

  return (
    <>
      <Card className="workspaceCard">
        <div className="workspaceCardHeading">
          <h1 style={{ marginLeft: "50px", fontWeight: "lighter" }}>
            Generate a issue
          </h1>
        </div>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              if (!values.issueDescription) {
                errors.issueDescription = "Required";
              }
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, touched, errors }) => (
              <Form>
                <Box margin={3}>
                  <Field
                    component={Autocomplete}
                    name="task"
                    options={reqTask}
                    fullWidth
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        helperText={touched["task"] && errors["task"]}
                        label="Select Task"
                      />
                    )}
                  />
                </Box>
                <Box margin={3}>
                  <Field
                    component={TextField}
                    name="issueDescription"
                    type="textarea"
                    row="5"
                    fullWidth
                    label="Issue Description"
                  />
                </Box>
                <Box margin={3}>
                  {isLoading && <LinearProgress />}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    style={{ margin: "5px 0 0 0" }}
                  >
                    Generate Issue
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          {/* </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export default HelpCenter;
