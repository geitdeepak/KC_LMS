import {
  Box,
  Typography
} from "@mui/material";

import AddRoundedIcon
  from "@mui/icons-material/AddRounded";

import KCButton
  from "../../../kc/button/KCButton";

const CourseToolbar = () => {

  return (

    <Box
      sx={{

        mb: 4,

        display: "flex",

        justifyContent: "space-between",

        alignItems: "flex-end",

        flexWrap: "wrap",

        gap: 3

      }}
    >

      <Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700
          }}
        >

          Courses

        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#6B7280"
          }}
        >

          Manage all learning courses.

        </Typography>

      </Box>

      <KCButton

        sx={{
          width: 180
        }}

        startIcon={<AddRoundedIcon />}

      >

        Create Course

      </KCButton>

    </Box>

  );

};

export default CourseToolbar;