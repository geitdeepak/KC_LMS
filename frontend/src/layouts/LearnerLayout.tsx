import {
  Box
} from "@mui/material";

import {
  Outlet
} from "react-router-dom";

import {
  useState
} from "react";

import Sidebar
  from "./Sidebar";

import Topbar
  from "./Topbar";

const drawerWidth = 270;

const LearnerLayout = () => {

  const [mobileOpen,
    setMobileOpen] =
    useState(false);

  const handleDrawerToggle =
    () => {

      setMobileOpen(
        !mobileOpen
      );

    };

  return (

    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default"
      }}
    >

      <Topbar
        onMenuClick={
          handleDrawerToggle
        }
      />

      <Sidebar
        mobileOpen={
          mobileOpen
        }
        onClose={() =>
          setMobileOpen(
            false
          )
        }
      />

      <Box
        component="main"
        sx={{

          flexGrow: 1,

          ml: {
            xs: 0,
            md: `${drawerWidth}px`
          },

          mt: "64px",

          height: "calc(100vh - 64px)",

          overflowY: "auto",

          overflowX: "hidden",

          bgcolor: "background.default",

          p: {
            xs: 2,
            sm: 3,
            md: 4
          }

        }}
      >

        <Outlet />

      </Box>

    </Box>

  );

};

export default LearnerLayout;