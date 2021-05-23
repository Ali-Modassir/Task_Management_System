import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TaskContext } from "../context/taskContext";
import { AuthContext } from "../context/authContext";

import "./AdminPanel.css";

import DummyImage from "../assets/img/Image 6.png";

import BrandLogo from "../assets/img/logo.png";

const AdminPanel = () => {
  const { allUsers, setAllUsersHandler } = useContext(TaskContext);
  const history = useHistory();
  const auth = useContext(AuthContext);

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

  const logoutHandler = () => {
    auth.logout();
    history.push("/");
  };

  return (
    <>
      <div className="adminPanel-navbar">
        <img src={BrandLogo} alt="brand-logo" width="150" />
        <button className="logout-btn" onClick={logoutHandler}>
          LOGOUT
        </button>
      </div>
      <br />
      <br />
      <div className="adminPanel">
        <div className="adminPanel-comp-container">
          <div className="adminpanel-heading">Admin Panel</div>
          <div className="dash-myTask-container">
            <div className="dash-myTask-heading">
              <div className="dash-myTask-container-heading">
                <span>Client Details</span>
              </div>
            </div>
            <div className="dash-myTask-tasks-container">
              <div className="dash-myTask-tablehead">
                <span> </span>
                <span>Client Name</span>
                <span
                  className="dash-myTask-tablehead-col3"
                  style={{ width: "30%" }}
                >
                  Client Email
                </span>
                <span style={{ textAlign: "center" }}>Total Active Task</span>
                <span style={{ textAlign: "center" }}>Details</span>
              </div>
              <div className="dash-myTasks-task-container">
                {allUsers.map((user, index) => {
                  return (
                    <div className="dash-myTasks-task-container-contents">
                      <div
                        classname="dash-myTasks-task-container-col col0"
                        style={{ width: "20%" }}
                      >
                        <img
                          src={DummyImage}
                          alt="dummyImage"
                          width="80"
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className="dash-myTasks-task-container-col col1">
                        {user.userName}
                      </div>
                      <div
                        className="dash-myTasks-task-container-col col3"
                        style={{ width: "30%" }}
                      >
                        {user.userEmail}
                      </div>
                      <div
                        className="dash-myTasks-task-container-col col2"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {user.tasks.length}
                      </div>
                      <div
                        className="dash-myTasks-task-container-col col4"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          onClick={() => detailsHandler(user.userId)}
                          style={{ cursor: "pointer" }}
                        >
                          Click to get Details
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
