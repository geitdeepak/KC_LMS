import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";

import MenuIcon
  from "@mui/icons-material/Menu";

import NotificationsNoneIcon
  from "@mui/icons-material/NotificationsNone";

import SearchIcon
  from "@mui/icons-material/Search";

import {
  alpha,
  styled
} from "@mui/material/styles";

import {
  useContext,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  AuthContext
} from "../auth/AuthContext";

const Search = styled("div")(
  ({ theme }) => ({
    position: "relative",
    borderRadius: 30,
    backgroundColor:
      alpha(
        theme.palette.common.white,
        0.08
      ),

    "&:hover": {
      backgroundColor:
        alpha(
          theme.palette.common.white,
          0.12
        )
    },

    marginLeft: theme.spacing(3),

    width: "100%",

    maxWidth: 450,

    display: "flex",

    alignItems: "center"
  })
);

const SearchIconWrapper =
  styled("div")(
    ({ theme }) => ({
      padding:
        theme.spacing(
          0,
          2
        ),
      display: "flex",
      alignItems: "center"
    })
  );

const StyledInput =
  styled(InputBase)(
    ({ theme }) => ({
      color: "inherit",

      width: "100%",

      "& input": {

        padding:
          theme.spacing(
            1.4,
            1,
            1.4,
            0
          )

      }

    })
  );

interface Props {

  onMenuClick: () => void;

}

const Topbar = ({
  onMenuClick
}: Props) => {

  const auth =
    useContext(
      AuthContext
    );

  const navigate =
    useNavigate();

  const [anchorEl,
    setAnchorEl] =
    useState<null | HTMLElement>(
      null
    );

  const handleMenuOpen = (
    event:
      React.MouseEvent<
        HTMLElement
      >
  ) => {

    setAnchorEl(
      event.currentTarget
    );

  };

  const handleClose =
    () => {

      setAnchorEl(
        null
      );

    };

  const handleLogout =
    () => {

      auth?.logout();

      navigate("/login");

    };

  return (

    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderBottom:
          "1px solid rgba(255,255,255,.08)"
      }}
    >

      <Toolbar>

        <IconButton
          color="inherit"
          edge="start"
          onClick={
            onMenuClick
          }
          sx={{
            mr: 2
          }}
        >

          <MenuIcon />

        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mr: 3
          }}
        >

          KnowledgeCulture

        </Typography>

        <Search>

          <SearchIconWrapper>

            <SearchIcon />

          </SearchIconWrapper>

          <StyledInput
            placeholder="Search courses..."
          />

        </Search>

        <Box
          sx={{
            flexGrow: 1
          }}
        />

        <Tooltip
          title="Notifications"
        >

          <IconButton
            color="inherit"
          >

            <Badge
              badgeContent={4}
              color="error"
            >

              <NotificationsNoneIcon />

            </Badge>

          </IconButton>

        </Tooltip>

        <Tooltip
          title="Profile"
        >

          <IconButton
            color="inherit"
            onClick={
              handleMenuOpen
            }
          >

            <Avatar>

              {

                auth?.user?.firstName?.charAt(
                  0
                ) ??
                "U"

              }

            </Avatar>

          </IconButton>

        </Tooltip>

        <Menu
          anchorEl={
            anchorEl
          }
          open={
            Boolean(
              anchorEl
            )
          }
          onClose={
            handleClose
          }
        >

          <MenuItem
            onClick={
              handleClose
            }
          >
            My Profile
          </MenuItem>

          <MenuItem
            onClick={() => {

              navigate(
                "/learner/certificates"
              );

              handleClose();

            }}
          >
            Certificates
          </MenuItem>

          <MenuItem
            onClick={
              handleLogout
            }
          >
            Logout
          </MenuItem>

        </Menu>

      </Toolbar>

    </AppBar>

  );

};

export default Topbar;