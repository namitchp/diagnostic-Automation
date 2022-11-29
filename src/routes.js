import Dashboard from "./layouts/Dashboard";
import Logistics from "./layouts/Logistics";
import Masters from "./layouts/Masters";
import ProfileLayout from "./layouts/Profile";
import Sales from "./layouts/Sales";
import Stock from "./layouts/Stock";
import Support from "./layouts/Support";
import SwitchApp from "./pages/index";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/switch",
    component: SwitchApp,
  },
  {
    path: "/masters",
    component: Masters, 
  },
  {
    path: "/logistics",
    component: Logistics,
  },
  {
    path: "/sales",
    component: Sales,
  },
  {
    path: "/support",
    component: Support,
  },
  {
    path: "/configuration",
    component: Masters,
  },
  {
    path: "/stock",
    component: Stock,
  },
  {
    path: "/profile",
    component: ProfileLayout,
  },
];

export default routes;
