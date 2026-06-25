import {
  Box,
  Typography
} from "@mui/material";

import type {
  ReactNode
} from "react";

import AppCard
  from "../common/AppCard";

interface Props {

  title: string;

  value: number | string;

  subtitle?: string;

  icon: ReactNode;

}

const StatCard = ({
  title,
  value,
  subtitle,
  icon
}: Props) => {

  return (

    <AppCard>

      <Box
        sx={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center"

        }}
      >

        <Box>

          <Typography
            sx={{
              color: "#6B7280",
              fontSize: 15
            }}
          >

            {title}

          </Typography>

          <Typography
            variant="h4"
            sx={{
              mt: 1,
              fontWeight: 700
            }}
          >

            {value}

          </Typography>

          {

            subtitle && (

              <Typography
                sx={{
                  mt: 1,
                  color: "#10B981",
                  fontSize: 13
                }}
              >

                {subtitle}

              </Typography>

            )

          }

        </Box>

        <Box
          sx={{

            width: 64,

            height: 64,

            borderRadius: "50%",

            bgcolor: "#EEF2FF",

            color: "#4F46E5",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            "& svg": {

              fontSize: 34

            }

          }}
        >

          {icon}

        </Box>

      </Box>

    </AppCard>

  );

};

export default StatCard;