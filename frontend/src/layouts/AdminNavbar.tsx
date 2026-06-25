import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";

import SearchRoundedIcon
  from "@mui/icons-material/SearchRounded";

import NotificationsNoneRoundedIcon
  from "@mui/icons-material/NotificationsNoneRounded";

import LightModeRoundedIcon
  from "@mui/icons-material/LightModeRounded";

const SIDEBAR_WIDTH = 280;

const AdminNavbar = () => {

  return (

    <AppBar
      elevation={0}
      position="fixed"
      sx={{

        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,

        ml: `${SIDEBAR_WIDTH}px`,

        bgcolor: "#FFFFFF",

        borderBottom:
          "1px solid #E5E7EB",

        color: "#111827"

      }}
    >

      <Toolbar
        sx={{
          height: 72,
          px: 4
        }}
      >

        {/* ================= Left ================= */}

        <Box
          sx={{
            flex: 1
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700
            }}
          >

            KnowledgeCulture LMS

          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280"
            }}
          >

            Learning Management System

          </Typography>

        </Box>

        {/* ================= Search ================= */}

        <Paper
          elevation={0}
          sx={{

            width: 320,

            mr: 3,

            display: "flex",

            alignItems: "center",

            px: 2,

            py: .5,

            border:
              "1px solid #E5E7EB",

            borderRadius: 3

          }}
        >

          <SearchRoundedIcon
            sx={{
              color: "#9CA3AF",
              mr: 1
            }}
          />

          <InputBase

            placeholder="Search..."

            sx={{
              flex: 1
            }}

          />

        </Paper>

        {/* ================= Theme ================= */}

        <Tooltip title="Theme">

          <IconButton>

            <LightModeRoundedIcon />

          </IconButton>

        </Tooltip>

        {/* ================= Notifications ================= */}

        <Tooltip title="Notifications">

          <IconButton
            sx={{
              ml: 1
            }}
          >

            <Badge
              badgeContent={3}
              color="error"
            >

              <NotificationsNoneRoundedIcon />

            </Badge>

          </IconButton>

        </Tooltip>

        {/* ================= User ================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 3
          }}
        >

          <Avatar
            sx={{
              bgcolor: "#4F46E5"
            }}
          >

            A

          </Avatar>

          <Box
            sx={{
              ml: 2
            }}
          >

            <Typography
              sx={{
                fontWeight: 600,
                lineHeight: 1.2
              }}
            >

              Administrator

            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#6B7280"
              }}
            >

              Super Admin

            </Typography>

          </Box>

        </Box>

      </Toolbar>

    </AppBar>

  );

};

export default AdminNavbar;