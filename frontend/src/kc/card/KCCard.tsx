import {
  Card,
  type CardProps
} from "@mui/material";

const KCCard = ({
  children,
  sx,
  ...props
}: CardProps) => {

  return (

    <Card

      elevation={0}

      {...props}

      sx={{

        background:
          "#111827",

        border:
          "1px solid rgba(255,255,255,.06)",

        borderRadius: "18px",

        boxShadow:
          "0 15px 45px rgba(0,0,0,.30)",

        transition:
          "all .25s ease",

        "&:hover": {

          transform:
            "translateY(-4px)",

          boxShadow:
            "0 25px 60px rgba(0,0,0,.40)"

        },

        ...sx

      }}

    >

      {children}

    </Card>

  );

};

export default KCCard;