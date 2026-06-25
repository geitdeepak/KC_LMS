import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography
} from "@mui/material";

import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

const DashboardStatCard = ({
  title,
  value,
  icon,
  subtitle
}: Props) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 35px rgba(0,0,0,0.10)"
        }
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary"
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

            {subtitle && (
              <Chip
                size="small"
                label={subtitle}
                sx={{
                  mt: 2
                }}
              />
            )}
          </Box>

          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "primary.main",
              boxShadow:
                "0 8px 20px rgba(25,118,210,0.35)"
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;