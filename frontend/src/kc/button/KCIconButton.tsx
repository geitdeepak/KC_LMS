import {
  IconButton,
  type IconButtonProps
} from "@mui/material";

import Radius
  from "../../theme/radius";

import Shadows
  from "../../theme/shadow";

const KCIconButton = ({
  children,
  sx,
  ...props
}: IconButtonProps) => {

  return (

    <IconButton

      {...props}

      sx={{

        borderRadius:
          Radius.md,

        boxShadow:
          Shadows.xs,

        transition:
          ".2s",

        "&:hover": {

          transform:
            "translateY(-2px)",

          boxShadow:
            Shadows.sm

        },

        ...sx

      }}

    >

      {children}

    </IconButton>

  );

};

export default KCIconButton;