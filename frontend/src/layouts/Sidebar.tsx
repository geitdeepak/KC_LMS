import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
} from "@mui/material";

import DashboardRoundedIcon
  from "@mui/icons-material/DashboardRounded";

import SchoolRoundedIcon
  from "@mui/icons-material/SchoolRounded";

import WorkspacePremiumRoundedIcon
  from "@mui/icons-material/WorkspacePremiumRounded";

import CalendarMonthRoundedIcon
  from "@mui/icons-material/CalendarMonthRounded";

import ForumRoundedIcon
  from "@mui/icons-material/ForumRounded";

import PersonRoundedIcon
  from "@mui/icons-material/PersonRounded";

import LogoutRoundedIcon
  from "@mui/icons-material/LogoutRounded";

import {
  useContext
} from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  AuthContext
} from "../auth/AuthContext";

const drawerWidth = 270;

interface Props {

  mobileOpen: boolean;

  onClose: () => void;

}

const Sidebar = ({
  mobileOpen,
  onClose
}: Props) => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const auth =
    useContext(
      AuthContext
    );

  const menuItems = [

    {
      text: "Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/learner/dashboard"
    },

    {
      text: "My Courses",
      icon: <SchoolRoundedIcon />,
      path: "/learner/courses"
    },

    {
      text: "Certificates",
      icon: <WorkspacePremiumRoundedIcon />,
      path: "/learner/certificates"
    },

    {
      text: "Calendar",
      icon: <CalendarMonthRoundedIcon />,
      path: "#"
    },

    {
      text: "Discussion Forum",
      icon: <ForumRoundedIcon />,
      path: "#"
    },

    {
      text: "Profile",
      icon: <PersonRoundedIcon />,
      path: "#"
    }

  ];

  const drawer = (

    <>

      <Toolbar>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700
          }}
        >
          KC LMS
        </Typography>

      </Toolbar>

      <Divider />

      <List>

        {

          menuItems.map(
            item => (

              <ListItemButton
                key={item.text}
                selected={
                  location.pathname.startsWith(
                    item.path
                  )
                }
                onClick={() => {

                  if (
                    item.path !== "#"
                  ) {

                    navigate(
                      item.path
                    );

                  }

                  onClose();

                }}
                sx={{
                  mx: 1,
                  my: .5,
                  borderRadius: 3
                }}
              >

                <ListItemIcon>

                  {item.icon}

                </ListItemIcon>

                <ListItemText
                  primary={
                    item.text
                  }
                />

              </ListItemButton>

            )
          )

        }

      </List>

      <Box
        sx={{
          flexGrow: 1
        }}
      />

      <Divider />

      <List>

        <ListItemButton
          onClick={() => {

            auth?.logout();

            navigate("/login");

          }}
          sx={{
            mx: 1,
            my: 1,
            borderRadius: 3
          }}
        >

          <ListItemIcon>

            <LogoutRoundedIcon />

          </ListItemIcon>

          <ListItemText
            primary="Logout"
          />

        </ListItemButton>

      </List>

    </>

  );

  return (

    <>

      {/* Mobile */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: {
            xs: "block",
            md: "none"
          },

          "& .MuiDrawer-paper": {

            width: drawerWidth

          }

        }}
      >

        {drawer}

      </Drawer>

      {/* Desktop */}

      <Drawer
        variant="permanent"
        sx={{

          display: {
            xs: "none",
            md: "block"
          },

          "& .MuiDrawer-paper": {

            width: drawerWidth,

            boxSizing:
              "border-box"

          }

        }}
        open
      >

        {drawer}

      </Drawer>

    </>

  );

};

export default Sidebar;