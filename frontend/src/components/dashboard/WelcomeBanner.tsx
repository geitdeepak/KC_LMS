import {
  Box,
  Button,
  Stack,
  Typography
} from "@mui/material";

import ArrowForwardIcon
  from "@mui/icons-material/ArrowForward";

const WelcomeBanner = () => {

  const hour =
    new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (

    <Box
      sx={{

        background:
          "linear-gradient(135deg,#1E3A8A,#4F46E5)",

        color: "#FFFFFF",

        borderRadius: 3,

        p: {
          xs: 3,
          md: 4
        },

        mb: 4,

        position: "relative",

        overflow: "hidden"

      }}
    >

      <Box
        sx={{

          position: "absolute",

          right: -70,

          top: -70,

          width: 180,

          height: 180,

          borderRadius: "50%",

          bgcolor:
            "rgba(255,255,255,.08)"

        }}
      />

      <Stack
        spacing={2}
        sx={{
          position: "relative",
          zIndex: 2
        }}
      >

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700
          }}
        >

          {greeting} 👋

        </Typography>

        <Typography
          variant="h6"
        >

          Welcome back to KnowledgeCulture LMS

        </Typography>

        <Typography
          sx={{

            opacity: .9,

            maxWidth: 520

          }}
        >

          Continue your learning journey and
          complete your certifications.

        </Typography>

        <Button

          variant="contained"

          endIcon={
            <ArrowForwardIcon />
          }

          sx={{

            width: 200,

            bgcolor: "#FFFFFF",

            color: "#1E3A8A",

            fontWeight: 700,

            textTransform: "none",

            "&:hover": {

              bgcolor: "#F3F4F6"

            }

          }}

        >

          Continue Learning

        </Button>

      </Stack>

    </Box>

  );

};

export default WelcomeBanner;