import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";

import {
  useContext,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import PersonRoundedIcon
  from "@mui/icons-material/PersonRounded";

import LockRoundedIcon
  from "@mui/icons-material/LockRounded";

import SettingsRoundedIcon
  from "@mui/icons-material/SettingsRounded";

import LogoutRoundedIcon
  from "@mui/icons-material/LogoutRounded";

import DarkModeRoundedIcon
  from "@mui/icons-material/DarkModeRounded";

import NotificationsRoundedIcon
  from "@mui/icons-material/NotificationsRounded";

import {
  AuthContext
} from "../../auth/AuthContext";

const UserMenu = () => {

  const auth =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const [anchorEl,
    setAnchorEl] =
    useState<null | HTMLElement>(null);

  const user =
    auth?.user;

  const initials =
    user
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      : "A";

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {

    setAnchorEl(
      event.currentTarget
    );

  };

  const handleClose = () => {

    setAnchorEl(null);

  };

  const logout = () => {

    auth?.logout();

    navigate("/login");

  };

  return (

    <>

      <IconButton
        onClick={handleOpen}
      >

        <Avatar
          sx={{
            bgcolor: "#4F46E5"
          }}
        >

          {initials}

        </Avatar>

      </IconButton>

      <Menu

        anchorEl={anchorEl}

        open={Boolean(anchorEl)}

        onClose={handleClose}

      >

        <MenuItem disabled>

          <div>

            <Typography
            sx={{
                fontWeight: 700
            }}
>

              {user?.firstName} {user?.lastName}

            </Typography>

            <Typography
              variant="caption"
            >

              {user?.email}

            </Typography>

          </div>

        </MenuItem>

        <Divider />

        <MenuItem>

          <ListItemIcon>

            <PersonRoundedIcon />

          </ListItemIcon>

          My Profile

        </MenuItem>

        <MenuItem>

          <ListItemIcon>

            <LockRoundedIcon />

          </ListItemIcon>

          Change Password

        </MenuItem>

        <MenuItem>

          <ListItemIcon>

            <DarkModeRoundedIcon />

          </ListItemIcon>

          Appearance

        </MenuItem>

        <MenuItem>

          <ListItemIcon>

            <NotificationsRoundedIcon />

          </ListItemIcon>

          Notifications

        </MenuItem>

        <MenuItem>

          <ListItemIcon>

            <SettingsRoundedIcon />

          </ListItemIcon>

          Settings

        </MenuItem>

        <Divider />

        <MenuItem
          onClick={logout}
        >

          <ListItemIcon>

            <LogoutRoundedIcon
              color="error"
            />

          </ListItemIcon>

          Logout

        </MenuItem>

      </Menu>

    </>

  );

};

export default UserMenu;