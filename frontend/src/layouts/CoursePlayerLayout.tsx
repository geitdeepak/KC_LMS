import {
  Outlet,
  useNavigate
} from "react-router-dom";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";

import ArrowBackIosNewRoundedIcon
  from "@mui/icons-material/ArrowBackIosNewRounded";

import NotificationsNoneRoundedIcon
  from "@mui/icons-material/NotificationsNoneRounded";

const CoursePlayerLayout = () => {

  const navigate =
    useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#07111F",
        color: "white"
      }}
    >

      {/* ===================== NAVBAR ===================== */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#101B30",
          borderBottom:
            "1px solid rgba(255,255,255,.08)"
        }}
      >

        <Toolbar
          sx={{
            height: 72,
            px: 3
          }}
        >

          <Tooltip title="Back to Courses">

            <IconButton
              onClick={() =>
                navigate(
                  "/learner/courses"
                )
              }
              sx={{
                color: "white",
                mr: 2
              }}
            >

              <ArrowBackIosNewRoundedIcon />

            </IconButton>

          </Tooltip>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: .3
            }}
          >

            KnowledgeCulture LMS

          </Typography>

          <Box
            sx={{
              flexGrow: 1
            }}
          />

          <Tooltip title="Notifications">

            <IconButton
              sx={{
                color: "white",
                mr: 2
              }}
            >

              <Badge
                badgeContent={4}
                color="error"
              >

                <NotificationsNoneRoundedIcon />

              </Badge>

            </IconButton>

          </Tooltip>

          <Avatar
            sx={{
              bgcolor: "#D1D5DB",
              color: "#111827",
              width: 48,
              height: 48,
              fontWeight: 700
            }}
          >

            A

          </Avatar>

        </Toolbar>

      </AppBar>

      {/* ===================== CONTENT ===================== */}

      <Box
        sx={{
          pt: "72px",
          height: "100vh",
          overflow: "hidden"
        }}
      >

        <Outlet />

      </Box>

    </Box>

  );

};

export default CoursePlayerLayout;