import {
  Box
} from "@mui/material";

import {
  Outlet
} from "react-router-dom";

import AdminSidebar
  from "./AdminSidebar";

import AdminNavbar
  from "./AdminNavbar";

const SIDEBAR_WIDTH = 280;

const AdminLayout = () => {

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC"
      }}
    >

      {/* ================= Sidebar ================= */}

      <AdminSidebar />

      {/* ================= Main ================= */}

      <Box
        sx={{
          flex: 1,

          ml: `${SIDEBAR_WIDTH}px`,

          display: "flex",

          flexDirection: "column",

          minHeight: "100vh"
        }}
      >

        {/* ================= Navbar ================= */}

        <AdminNavbar />

        {/* ================= Content ================= */}

        <Box
          component="main"
          sx={{

            flex: 1,

            p: 4,

            mt: "72px",

            overflowY: "auto"

          }}
        >

          <Outlet />

        </Box>

      </Box>

    </Box>

  );

};

export default AdminLayout;