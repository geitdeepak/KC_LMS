import {
  Card,
  type CardProps
} from "@mui/material";

import Colors from "../../theme/colors";
import Radius from "../../theme/radius";
import Shadows from "../../theme/shadow";

export type KCCardProps = CardProps;

const KCCard = ({
  children,
  sx,
  ...props
}: KCCardProps) => {

  return (

    <Card
      elevation={0}
      {...props}
      sx={{

        backgroundColor: Colors.surface,

        border: `1px solid ${Colors.divider}`,

        borderRadius: Radius.lg,

        boxShadow: Shadows.md,

        overflow: "hidden",

        transition: ".25s",

        "&:hover": {

          boxShadow: Shadows.lg

        },

        ...sx

      }}

    >

      {children}

    </Card>

  );

};

export default KCCard;