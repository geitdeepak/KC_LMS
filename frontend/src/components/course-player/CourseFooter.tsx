import {
  Box,
  Button,
  Divider,
  Typography
} from "@mui/material";

import ArrowBackRoundedIcon
  from "@mui/icons-material/ArrowBackRounded";

import ArrowForwardRoundedIcon
  from "@mui/icons-material/ArrowForwardRounded";

import CheckCircleRoundedIcon
  from "@mui/icons-material/CheckCircleRounded";

const CourseFooter = () => {

  return (

    <>

      <Divider
        sx={{
          borderColor:
            "rgba(255,255,255,.08)",
          mt: 5,
          mb: 4
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2
        }}
      >

        {/* Previous */}

        <Button
          variant="outlined"
          startIcon={
            <ArrowBackRoundedIcon />
          }
          disabled
        >

          Previous Lesson

        </Button>

        {/* Center */}

        <Box
          sx={{
            textAlign: "center"
          }}
        >

          <Typography
            sx={{
              color: "#94A3B8",
              mb: 1
            }}
          >

            Complete this lesson to
            continue your learning
            journey.

          </Typography>

          <Button
            variant="contained"
            color="success"
            startIcon={
              <CheckCircleRoundedIcon />
            }
            disabled
          >

            Mark Complete

          </Button>

        </Box>

        {/* Next */}

        <Button
          variant="contained"
          endIcon={
            <ArrowForwardRoundedIcon />
          }
          disabled
        >

          Next Lesson

        </Button>

      </Box>

    </>

  );

};

export default CourseFooter;