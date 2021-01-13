import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Navbar from "../components/Navbars/Navbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

//Importing Route
import routes from "../routes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/dashLayoutStyle.js";

//Logo Image and Background
import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dash") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/dash" to="/dash/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function DashLayout({ ...rest }) {
  // styles
  const classes = useStyles();

  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Encomece TMS"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color="blue"
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
      </div>
    </div>
  );
}
