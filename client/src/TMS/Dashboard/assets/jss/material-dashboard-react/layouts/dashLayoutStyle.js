import { drawerWidth, transition, container } from "../../customStyle.js";

const appStyle = (theme) => ({
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
  },
  mainPanel: {
    position: "absolute",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "60%",
    left: drawerWidth,
    [theme.breakpoints.down("md")]: {
      left: "0",
      width: "70%",
    },
  },
  content: {
    marginTop: "30px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 177px)",
  },
  container,
  map: {
    marginTop: "70px",
  },
  leftSidebar: {
    width: "20%",
    backgroundColor: "grey",
  },
});

export default appStyle;
