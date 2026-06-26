import {
  Avatar,
  Box,
  Typography
} from "@mui/material";

import TrendingUpRoundedIcon
  from "@mui/icons-material/TrendingUpRounded";

import type {
  ReactNode
} from "react";

import KCCard
  from "./KCCard";

import Colors
  from "../../theme/colors";

export interface KCStatCardProps {

  title: string;

  value: string | number;

  icon: ReactNode;

  growth?: string;

}

const KCStatCard = ({

  title,

  value,

  icon,

  growth

}: KCStatCardProps) => {

  return (

    <KCCard>

      <Box

        sx={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center"

        }}

      >

        <Box>

          <Typography

            variant="body2"

            sx={{

              color: Colors.textSecondary

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

            growth && (

              <Box

                sx={{

                  mt: 2,

                  display: "flex",

                  alignItems: "center",

                  gap: .5

                }}

              >

                <TrendingUpRoundedIcon

                  color="success"

                  fontSize="small"

                />

                <Typography

                  variant="body2"

                  color="success.main"

                >

                  {growth}

                </Typography>

              </Box>

            )

          }

        </Box>

        <Avatar

          sx={{

            width: 62,

            height: 62,

            bgcolor: Colors.primary

          }}

        >

          {icon}

        </Avatar>

      </Box>

    </KCCard>

  );

};

export default KCStatCard;