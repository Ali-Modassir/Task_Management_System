import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PerosnImg from "../../assets/img/PersonImg.png";
import "./RightSidebar.css";

import { EmailOutlined } from "@material-ui/icons";
import PhoneIcon from "@material-ui/icons/Phone";

import { AuthContext } from "../../../context/authContext";

const LeftSidebar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    auth.logout();
    history.push("/auth");
  };

  return (
    <div className="dash-leftSidebar">
      <div className="dash-loginBtn">
        <button className="dash-logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className="dash-avatarImg">
        <img src={PerosnImg} alt="person-img" />
      </div>
      <div className="dash-client-name">{auth.userName}</div>
      <div className="dash-clientDetails">
        <div className="dash-client-about-heading">About</div>
        <div className="dash-client-about">
          Lorem ipsum dolor sit amet, conse tetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dol ore magna aliquyam
          erat, sed diam vol uptua. At vero eos et accusam et justo duo dolores
        </div>
        <div className="dash-contactDetails">
          <div className="dash-contact-email">
            <EmailOutlined /> <span>{auth.userEmail}</span>
          </div>
          <div className="dash-contact-phone">
            <PhoneIcon />
            <span>Add a Number</span>
          </div>
        </div>
        <div className="dash-update-btn">
          <button>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
