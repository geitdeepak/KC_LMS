import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";

import AccessTimeRoundedIcon
  from "@mui/icons-material/AccessTimeRounded";

import MenuBookRoundedIcon
  from "@mui/icons-material/MenuBookRounded";

import type {
  LessonDto
} from "../../types/course";

interface Props {

  lesson: LessonDto;

}

const LessonHeader = ({
  lesson
}: Props) => {

  return (

    <Box
      sx={{
        mb: 4
      }}
    >

      <Typography
        variant="h3"
        sx={{
          color: "white",
          fontWeight: 700,
          mb: 1
        }}
      >

        {lesson.title}

      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 3,
          flexWrap: "wrap"
        }}
      >

        <Chip

          icon={<MenuBookRoundedIcon />}

          label={lesson.lessonType}

          color="primary"

        />

        <Chip

          icon={<AccessTimeRoundedIcon />}

          label="30 Minutes"

          variant="outlined"

          sx={{
            color: "white",
            borderColor:
              "rgba(255,255,255,.20)"
          }}

        />

        <Chip

          label={
            lesson.isPublished
              ? "Published"
              : "Draft"
          }

          color={
            lesson.isPublished
              ? "success"
              : "warning"
          }

        />

      </Stack>

      <Typography
        sx={{
          color: "#CBD5E1",
          fontSize: 17,
          lineHeight: 1.8,
          mb: 3
        }}
      >

        {lesson.description}

      </Typography>

      <Typography
        sx={{
          color: "white",
          fontWeight: 600,
          mb: 1
        }}
      >

        Lesson Progress

      </Typography>

      <LinearProgress

        variant="determinate"

        value={35}

        sx={{

          height: 10,

          borderRadius: 10,

          bgcolor: "rgba(255,255,255,.08)",

          "& .MuiLinearProgress-bar": {

            borderRadius: 10

          }

        }}

      />

    </Box>

  );

};

export default LessonHeader;