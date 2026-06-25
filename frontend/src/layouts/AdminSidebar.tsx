import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

import {
  NavLink
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../auth/AuthContext";

import adminNavigation
  from "../config/navigation/adminNavigation";

const SIDEBAR_WIDTH = 280;

const AdminSidebar = () => {

  const auth =
    useContext(AuthContext);

  const user =
    auth?.user;

  const initials =
    user
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      : "A";

  return (

    <Box
      sx={{

        width: SIDEBAR_WIDTH,

        height: "100vh",

        position: "fixed",

        left: 0,

        top: 0,

        bgcolor: "#111827",

        color: "#fff",

        display: "flex",

        flexDirection: "column",

        borderRight: "1px solid rgba(255,255,255,.08)"

      }}
    >

      {/* ================= Logo ================= */}

      <Box
        sx={{
          p: 3
        }}
      >

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700
          }}
        >

          KnowledgeCulture

        </Typography>

        <Typography
          sx={{
            color: "#9CA3AF",
            fontSize: 13,
            mt: .5
          }}
        >

          Learning Management System

        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 700,
            letterSpacing: 3,
            color: "#6366F1"
          }}
        >

          {user?.role?.toUpperCase()}

        </Typography>

      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)"
        }}
      />

      {/* ================= Navigation ================= */}

      <List
        sx={{
          px: 2,
          py: 2,
          flex: 1
        }}
      >

        {

          adminNavigation.map(item => {

            const Icon =
              item.icon;

            return (

              <ListItemButton

                key={item.id}

                component={NavLink}

                to={item.path}

                sx={{

                  borderRadius: 3,

                  mb: 1,

                  color: "#D1D5DB",

                  "&.active": {

                    bgcolor: "#4F46E5",

                    color: "#fff"

                  },

                  "&:hover": {

                    bgcolor: "rgba(255,255,255,.08)"

                  }

                }}

              >

                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 42
                  }}
                >

                  <Icon />

                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                />

              </ListItemButton>

            );

          })

        }

      </List>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)"
        }}
      />

      {/* ================= Logged In User ================= */}

      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2
        }}
      >

        <Avatar
          sx={{
            bgcolor: "#6366F1",
            fontWeight: 700
          }}
        >

          {initials}

        </Avatar>

        <Box>

          <Typography
            sx={{
              fontWeight: 600
            }}
          >

            {user
              ? `${user.firstName} ${user.lastName}`
              : "Administrator"}

          </Typography>

          <Typography
            sx={{
              color: "#9CA3AF",
              fontSize: 13
            }}
          >

            {user?.email}

          </Typography>

        </Box>

      </Box>

    </Box>

  );

};

export default AdminSidebar;