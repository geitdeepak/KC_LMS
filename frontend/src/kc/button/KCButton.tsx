import {
  Button,
  type ButtonProps
} from "@mui/material";

import Colors
  from "../../theme/colors";

import Radius
  from "../../theme/radius";

import Shadows
  from "../../theme/shadow";

export interface KCButtonProps
  extends ButtonProps {

  fullWidth?: boolean;

}

const KCButton = ({
  children,
  sx,
  fullWidth = false,
  variant = "contained",
  ...props
}: KCButtonProps) => {

  return (

    <Button

      {...props}

      fullWidth={fullWidth}

      variant={variant}

      disableElevation

      sx={{

        minHeight: 46,

        borderRadius:
          Radius.md,

        textTransform: "none",

        fontWeight: 700,

        fontSize: 15,

        background:
          `linear-gradient(135deg,
            ${Colors.primary},
            ${Colors.secondary})`,

        transition:
          ".25s",

        boxShadow:
          Shadows.sm,

        "&:hover": {

          background:
            `linear-gradient(135deg,
              ${Colors.primaryDark},
              ${Colors.primary})`,

          transform:
            "translateY(-2px)",

          boxShadow:
            Shadows.md

        },

        "&:active": {

          transform:
            "translateY(0)"

        },

        "&.Mui-disabled": {

          background:
            Colors.surfaceLight,

          color:
            Colors.textSecondary

        },

        ...sx

      }}

    >

      {children}

    </Button>

  );

};

export default KCButton;