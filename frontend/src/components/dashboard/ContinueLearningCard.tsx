import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Typography
} from "@mui/material";

import PlayArrowRoundedIcon
  from "@mui/icons-material/PlayArrowRounded";

import {
  useEffect,
  useState
} from "react";

import {
  getContinueLearning
} from "../../services/continueLearningService";

import type {
  ContinueLearning
} from "../../types/continueLearning";

const ContinueLearningCard = () => {

  const [course, setCourse] =
    useState<ContinueLearning | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadContinueLearning();

  }, []);

  const loadContinueLearning =
    async () => {

      try {

        setLoading(true);

        const data =
          await getContinueLearning();

        setCourse(data);

      }

      catch {

        setError(
          "Unable to load Continue Learning."
        );

      }

      finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <Card>

        <CardContent>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 5
            }}
          >

            <CircularProgress />

          </Box>

        </CardContent>

      </Card>

    );

  }

  if (error) {

    return (

      <Alert severity="error">

        {error}

      </Alert>

    );

  }

  if (!course) {

    return null;

  }

  return (

    <Card>

      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3
          }}
        >

          <Typography variant="h5">

            Continue Learning

          </Typography>

          {

            course.isCourseCompleted && (

              <Chip
                color="success"
                label="Completed"
              />

            )

          }

        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3
          }}
        >

          <Box
            component="img"
            src={course.thumbnailUrl}
            alt={course.courseTitle}
            sx={{
              width: 180,
              borderRadius: 2
            }}
          />

          <Box
            sx={{
              flex: 1
            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700
              }}
            >

              {course.courseTitle}

            </Typography>

            <Typography
              color="text.secondary"
            >

              Module • {course.moduleTitle}

            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 3
              }}
            >

              Lesson • {course.lessonTitle}

            </Typography>

            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{
                height: 10,
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
              variant="contained"
              startIcon={
                <PlayArrowRoundedIcon />
              }
              sx={{
                mt: 3
              }}
            >

              Resume Learning

            </Button>

          </Box>

        </Box>

      </CardContent>

    </Card>

  );

};

export default ContinueLearningCard;