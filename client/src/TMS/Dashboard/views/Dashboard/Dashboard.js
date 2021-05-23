import React from "react";
import dashHeaderImg from "../../assets/img/dashHeaderImg.png";
import MyTask from "../Workspace/Components/MyTask/MyTask";
import ReviewCard from "./Components/ReviewCard";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dash-dashboard-container">
      <div className="dash-dashboard-header">
        <div className="dash-dashboard-welcome">
          <div className="dash-dashboard-heading">Welcome!</div>
          <div className="dash-dashboard-message">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero
          </div>
        </div>
        <div className="dash-dashboard-headerImg">
          <img src={dashHeaderImg} alt="header-img" />
        </div>
      </div>
      <ReviewCard />
      <MyTask />
    </div>
  );
};

export default Dashboard;
