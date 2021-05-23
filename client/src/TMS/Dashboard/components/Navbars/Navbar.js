import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
//Context
import { AuthContext } from "../../../context/authContext";

//Style
import "./Navbar.css";

const Header = (props) => {
  const history = useHistory();

  //Auth-Context
  const auth = useContext(AuthContext);

  //Logout
  const logoutHandler = () => {
    auth.logout();
    history.push("/auth");
  };

  /* Here we create navbar brand, based on route name */
  const location = useLocation();
  const [NavbarHeading, setNavBarHeading] = useState(
    location.pathname.split("/").pop().toUpperCase()
  );
  useEffect(() => {
    setNavBarHeading(location.pathname.split("/").pop().toUpperCase());
  }, [location]);

  if (NavbarHeading.length == 1) {
    setNavBarHeading("PROJECT DETAILS");
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Hidden lgUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
            style={{ marginTop: "15px" }}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <div className="navbar">
          <div className="navbarHeading">{NavbarHeading}</div>
        </div>
      </div>
    </>
  );
};

export default Header;
