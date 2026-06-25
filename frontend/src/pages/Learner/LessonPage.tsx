import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Alert,
  Chip,
  Box
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import type {
  LessonDto
} from "../../types/course";

import type {
  QuizDto
} from "../../types/quiz";

import {
  getLessonById,
  completeLesson,
  getLessonProgress,
  getQuizzesByLesson,
  getQuizStatus
} from "../../services/courseService";

const LessonPage = () => {
  const { lessonId } = useParams();

  const navigate =
    useNavigate();

  const [lesson, setLesson] =
    useState<LessonDto | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [completed, setCompleted] =
    useState(false);

  const [quizPassed, setQuizPassed] =
    useState(false);

  const [quiz, setQuiz] =
    useState<QuizDto | null>(
      null
    );

  const [successMessage,
    setSuccessMessage] =
    useState("");

  useEffect(() => {
    const loadLesson =
      async () => {
        try {
          const lessonData =
            await getLessonById(
              lessonId!
            );

          setLesson(
            lessonData
          );

          const quizzes =
            await getQuizzesByLesson(
              lessonId!
            );

          if (
            quizzes.length > 0
          ) {
            const lessonQuiz =
              quizzes[0];

            setQuiz(
              lessonQuiz
            );

            const status =
              await getQuizStatus(
                lessonQuiz.id
              );

            setQuizPassed(
              status.isPassed
            );
          }

          const progress =
            await getLessonProgress(
              lessonId!
            );

          if (
            progress &&
            progress.isCompleted
          ) {
            setCompleted(
              true
            );
          }
        }
        catch (error) {
          console.error(error);
        }
        finally {
          setLoading(false);
        }
      };

    loadLesson();
  }, [lessonId]);

  const handleCompleteLesson =
    async () => {
      try {
        await completeLesson(
          lessonId!
        );

        setCompleted(true);

        setSuccessMessage(
          "Lesson marked as completed successfully."
        );
      }
      catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <Container
        sx={{
          mt: 10,
          textAlign: "center"
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!lesson) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>
          Lesson not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4
      }}
    >
      {/* Hero Section */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 4
        }}
      >
        <CardContent
          sx={{
            p: 4
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700
            }}
          >
            {lesson.title}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
          >
            {lesson.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3
            }}
          >
            <Chip
              label={
                lesson.lessonType
              }
              color="primary"
            />

            <Chip
              label={
                completed
                  ? "Completed"
                  : "In Progress"
              }
              color={
                completed
                  ? "success"
                  : "warning"
              }
            />
          </Box>
        </CardContent>
      </Card>

      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 4
          }}
        >
          {successMessage}
        </Alert>
      )}

      {/* Learning Material */}

      <Card
        sx={{
          mb: 4,
          borderRadius: 4
        }}
      >
        <CardContent
          sx={{
            p: 4
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600
            }}
          >
            Learning Material
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3
            }}
          >
            Open the lesson material
            and complete your learning
            before attempting the quiz.
          </Typography>

          <Button
            variant="outlined"
            size="large"
            href={
              lesson.contentUrl
            }
            target="_blank"
          >
            Open Learning Material
          </Button>
        </CardContent>
      </Card>

      {/* Quiz Section */}

      {quiz && (
        <Card
          sx={{
            mb: 4,
            borderRadius: 4
          }}
        >
          <CardContent
            sx={{
              p: 4
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600
              }}
            >
              Quiz Assessment
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 3
              }}
            >
              Pass the quiz to unlock
              lesson completion.
            </Typography>

            <Chip
              label={
                quizPassed
                  ? "Quiz Passed"
                  : "Quiz Pending"
              }
              color={
                quizPassed
                  ? "success"
                  : "warning"
              }
              sx={{
                mb: 3
              }}
            />

            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  navigate(
                    `/learner/quizzes/${quiz.id}`
                  )
                }
              >
                {quizPassed
                  ? "View Quiz"
                  : "Take Quiz"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Progress Section */}

      <Card
        sx={{
          borderRadius: 4
        }}
      >
        <CardContent
          sx={{
            p: 4
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600
            }}
          >
            Lesson Progress
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3
            }}
          >
            {quiz
              ? quizPassed
                ? "Quiz passed successfully. You can now complete this lesson."
                : "Pass the quiz before completing this lesson."
              : "Complete this lesson to track your progress."}
          </Typography>

          <Button
            variant="contained"
            color="success"
            size="large"
            disabled={
              completed ||
              (quiz !== null &&
                !quizPassed)
            }
            onClick={
              handleCompleteLesson
            }
          >
            {completed
              ? "Completed"
              : "Mark As Completed"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LessonPage;