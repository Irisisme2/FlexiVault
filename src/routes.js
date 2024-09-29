import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdPerson,
  MdSavings,
  MdInsights,
  MdTrendingUp,
  MdAttachMoney,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Analytics from "views/admin/Analytics";
import MyVaults from "views/admin/MyVaults";
import Crossfi from "views/admin/Crossfi";
import Market from "views/admin/market";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "My Vaults",
    layout: "/admin",
    icon: <Icon as={MdSavings} width="20px" height="20px" color="inherit" />,
    path: "/MyVaults",
    component: MyVaults,
  },
  {
    name: "CrossFi Chain",
    layout: "/admin",
    path: "/Crossfi",
    icon: <Icon as={MdAttachMoney} width="20px" height="20px" color="inherit" />,
    component: Crossfi,
  },
  {
    name: "Analytics & Reports",
    layout: "/admin",
    icon: <Icon as={MdInsights} width="20px" height="20px" color="inherit" />,
    path: "/Analytics",
    component: Analytics,
  },
  {
    name: "Market Insights",
    layout: "/admin",
    icon: <Icon as={MdTrendingUp} width="20px" height="20px" color="inherit" />, 
    path: "/market",
    component: Market,
  },
];

export default routes;
