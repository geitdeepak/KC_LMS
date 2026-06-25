import {
  Card,
  CardContent,
  type CardProps
} from "@mui/material";

import type {
  ReactNode
} from "react";

interface Props extends CardProps {

  children: ReactNode;

}

const AppCard = ({
  children,
  sx,
  ...props
}: Props) => {

  return (

    <Card

      {...props}

      sx={{

        borderRadius: 4,

        border: "1px solid #E5E7EB",

        boxShadow:
          "0 2px 10px rgba(0,0,0,.05)",

        transition: ".25s",

        overflow: "hidden",

        "&:hover": {

          transform: "translateY(-2px)",

          boxShadow:
            "0 12px 30px rgba(0,0,0,.10)"

        },

        ...sx

      }}

    >

      <CardContent
        sx={{
          p: 3
        }}
      >

        {children}

      </CardContent>

    </Card>

  );

};

export default AppCard;