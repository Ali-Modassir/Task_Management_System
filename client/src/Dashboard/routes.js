// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Assignment from "@material-ui/icons/Assignment";

// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import Workspace from "./views/Workspace/Workspace";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/dash",
  },
  {
    path: "/workspace",
    name: "Workspace",
    icon: Assignment,
    component: Workspace,
    layout: "/dash",
  },
];

export default dashboardRoutes;
