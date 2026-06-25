import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography
} from "@mui/material";

import PlayArrowRoundedIcon
  from "@mui/icons-material/PlayArrowRounded";

import EmojiEventsRoundedIcon
  from "@mui/icons-material/EmojiEventsRounded";

import type {
  MyCourse
} from "../../types/myCourse";

interface Props {
  course: MyCourse;
}

const MyCourseCard = ({
  course
}: Props) => {

  return (

    <Card>

      <Box
        component="img"
        src={course.thumbnailUrl}
        alt={course.title}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover"
        }}
      />

      <CardContent>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1
          }}
        >
          {course.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            flexWrap: "wrap"
          }}
        >

          <Chip
            size="small"
            label={course.category}
          />

          <Chip
            size="small"
            label={course.level}
          />

          {
            course.isCompleted && (

              <Chip
                size="small"
                color="success"
                icon={<EmojiEventsRoundedIcon />}
                label="Completed"
              />

            )
          }

        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            minHeight: 42
          }}
        >
          {course.description}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={course.progress}
          sx={{
            height: 8,
            borderRadius: 10,
            mb: 1
          }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {course.completedLessons}
          {" / "}
          {course.totalLessons}
          {" Lessons Completed"}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          startIcon={
            <PlayArrowRoundedIcon />
          }
          sx={{
            mt: 3
          }}
        >
          Continue
        </Button>

      </CardContent>

    </Card>

  );

};

export default MyCourseCard;