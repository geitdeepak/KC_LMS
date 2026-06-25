import {
  createTheme,
  responsiveFontSizes
} from "@mui/material/styles";

import colors from "./colors";

let theme = createTheme({

  palette: {

    mode: "light",

    primary: {

      main: colors.primary

    },

    secondary: {

      main: colors.secondary

    },

    success: {

      main: colors.success

    },

    warning: {

      main: colors.warning

    },

    error: {

      main: colors.error

    },

    background: {

      default: colors.background,

      paper: colors.surface

    },

    text: {

      primary: colors.textPrimary,

      secondary: colors.textSecondary

    },

    divider: colors.divider

  },

  shape: {

    borderRadius: 16

  },

  typography: {

    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif"
    ].join(","),

    h1: {

      fontWeight: 700,

      fontSize: "2.8rem"

    },

    h2: {

      fontWeight: 700,

      fontSize: "2.2rem"

    },

    h3: {

      fontWeight: 600,

      fontSize: "1.8rem"

    },

    h4: {

      fontWeight: 600

    },

    h5: {

      fontWeight: 600

    },

    h6: {

      fontWeight: 600

    },

    body1: {

      lineHeight: 1.8

    }

  },

  components: {

    MuiCard: {

      styleOverrides: {

        root: {

          borderRadius: 16,

          border: `1px solid ${colors.divider}`,

          boxShadow:
            "0 2px 8px rgba(0,0,0,.05)",

          transition: ".25s",

          "&:hover": {

            transform:
              "translateY(-2px)",

            boxShadow:
              "0 10px 25px rgba(0,0,0,.10)"

          }

        }

      }

    },

    MuiButton: {

      defaultProps: {

        disableElevation: true

      },

      styleOverrides: {

        root: {

          textTransform: "none",

          borderRadius: 12,

          minHeight: 44,

          fontWeight: 600

        }

      }

    }

  }

});

theme =
  responsiveFontSizes(
    theme
  );

export default theme;