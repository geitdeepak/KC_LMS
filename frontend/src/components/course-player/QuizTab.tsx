import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Typography
} from "@mui/material";

import {
  getQuizzesByLesson
} from "../../services/courseService";

import QuizRoundedIcon
  from "@mui/icons-material/QuizRounded";

import EmojiEventsRoundedIcon
  from "@mui/icons-material/EmojiEventsRounded";

import TimerRoundedIcon
  from "@mui/icons-material/TimerRounded";

import CheckCircleRoundedIcon
  from "@mui/icons-material/CheckCircleRounded";

import {
  useNavigate
} from "react-router-dom";

import type {
  LessonDto
} from "../../types/course";

interface Props {

  lesson: LessonDto | null;

}

const QuizTab = ({
  lesson
}: Props) => {

  const navigate =
    useNavigate();

  if (!lesson) {

    return (

      <Alert severity="info">

        No lesson selected.

      </Alert>

    );

  }

  return (

    <Paper

      elevation={0}

      sx={{

        bgcolor: "#101B30",

        borderRadius: 3,

        border:
          "1px solid rgba(255,255,255,.08)",

        overflow: "hidden"

      }}

    >

      {/* Header */}

      <Box

        sx={{

          px: 4,

          py: 3,

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center"

        }}

      >

        <Typography

          variant="h4"

          sx={{

            color: "white",

            fontWeight: 700

          }}

        >

          Lesson Quiz

        </Typography>

        <Chip

          icon={<QuizRoundedIcon />}

          color="primary"

          label="Assessment"

        />

      </Box>

      <Divider />

      <Box
        sx={{
          p: 4
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >

          {lesson.title}

        </Typography>

        <Typography
          sx={{
            color: "#CBD5E1",
            lineHeight: 2,
            fontSize: 17,
            mb: 4
          }}
        >

          Complete this assessment to verify
          your understanding of the lesson.

        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 4
          }}
        >

          <Chip

            icon={<QuizRoundedIcon />}

            color="primary"

            label="10 Questions"

          />

          <Chip

            icon={<TimerRoundedIcon />}

            color="warning"

            label="30 Minutes"

          />

          <Chip

            icon={
              <EmojiEventsRoundedIcon />
            }

            color="success"

            label="Passing Score : 70%"

          />

        </Box>

        <Divider
          sx={{
            mb: 4,
            borderColor:
              "rgba(255,255,255,.08)"
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >

          Instructions

        </Typography>

        <Box
          component="ul"
          sx={{
            color: "#CBD5E1",
            lineHeight: 2,
            pl: 3,
            mb: 4
          }}
        >

          <li>
            Read every question carefully.
          </li>

          <li>
            Select the most appropriate answer.
          </li>

          <li>
            Submit the quiz before leaving the page.
          </li>

          <li>
            Passing score is 70%.
          </li>

        </Box>
                <Divider
          sx={{
            mb: 4,
            borderColor:
              "rgba(255,255,255,.08)"
          }}
        />

        {/* ================= Previous Attempt ================= */}

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >
          Previous Attempt
        </Typography>

        <Typography
          sx={{
            color: "#CBD5E1",
            mb: 2
          }}
        >
          No previous attempts found.
        </Typography>

        <LinearProgress
          variant="determinate"
          value={0}
          sx={{
            height: 10,
            borderRadius: 10,
            mb: 4,
            bgcolor: "rgba(255,255,255,.08)",

            "& .MuiLinearProgress-bar": {
              borderRadius: 10
            }
          }}
        />

        <Divider
          sx={{
            mb: 4,
            borderColor:
              "rgba(255,255,255,.08)"
          }}
        />

        {/* ================= Rewards ================= */}

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >
          Rewards
        </Typography>

        <Box
          component="ul"
          sx={{
            color: "#CBD5E1",
            pl: 3,
            lineHeight: 2,
            mb: 4
          }}
        >
          <li>
            Earn course completion credit.
          </li>

          <li>
            Unlock the next lesson after passing.
          </li>

          <li>
            Become eligible for certificate generation.
          </li>
        </Box>

        <Divider
          sx={{
            mb: 4,
            borderColor:
              "rgba(255,255,255,.08)"
          }}
        />

        {/* ================= Status ================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4
          }}
        >
          <CheckCircleRoundedIcon
            color="success"
          />

          <Typography
            sx={{
              color: "#CBD5E1"
            }}
          >
            Quiz is available and ready to start.
          </Typography>
        </Box>

        {/* ================= Actions ================= */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap"
          }}
        >
          <Button
  variant="contained"
  size="large"
  onClick={async () => {

    try {

      const quizzes =
        await getQuizzesByLesson(
          lesson.id
        );

      if (quizzes.length > 0) {

        navigate(
          `/learner/quizzes/${quizzes[0].id}`
        );

      }
      else {

        alert(
          "No quiz available for this lesson."
        );

      }

    }
    catch (error) {

      console.error(error);

      alert(
        "Unable to load quiz."
      );

    }

  }}
>
  Start Quiz
</Button>

          <Button
            variant="outlined"
            size="large"
            disabled
          >
            Review Attempt
          </Button>
        </Box>

      </Box>

    </Paper>

  );

};

export default QuizTab;