import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Box
} from "@mui/material";

import ExpandMoreIcon
  from "@mui/icons-material/ExpandMore";

import CheckCircleIcon
  from "@mui/icons-material/CheckCircle";

import PlayCircleIcon
  from "@mui/icons-material/PlayCircle";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getCourseDetails
} from "../../../services/courseService";

import type {
  CourseDetailsDto
} from "../../../types/course";

const CourseDetailsPage = () => {
  const { courseId } = useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState<CourseDetailsDto | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadCourse =
      async () => {
        try {
          const data =
            await getCourseDetails(
              courseId!
            );

          setCourse(data);
        }
        catch (error) {
          console.error(error);
        }
        finally {
          setLoading(false);
        }
      };

    loadCourse();
  }, [courseId]);

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

  if (!course) {
    return (
      <Container>
        <Typography>
          Course not found
        </Typography>
      </Container>
    );
  }

  const totalLessons =
    course.modules.reduce(
      (sum, module) =>
        sum + module.lessons.length,
      0
    );

  const completedLessons =
    course.modules.reduce(
      (sum, module) =>
        sum +
        module.lessons.filter(
          lesson => lesson.isCompleted
        ).length,
      0
    );

  const progress =
    totalLessons > 0
      ? Math.round(
          (completedLessons /
            totalLessons) *
            100
        )
      : 0;

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4
      }}
    >
      {/* Hero Card */}

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
            {course.title}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3
            }}
          >
            {course.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mb: 3
            }}
          >
            <Chip
              label={`${course.modules.length} Modules`}
            />

            <Chip
              label={`${totalLessons} Lessons`}
            />

            <Chip
              color="success"
              label={`${progress}% Completed`}
            />
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 12,
              borderRadius: 10
            }}
          />
        </CardContent>
      </Card>

      <Grid
        container
        spacing={3}
      >
        {/* Curriculum */}

        <Grid
          size={{
            xs: 12,
            md: 8
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600
            }}
          >
            Course Curriculum
          </Typography>

          {course.modules.map(
            module => (
              <Accordion
                key={module.id}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon />
                  }
                >
                  <Typography
                    sx={{
                      fontWeight: 600
                    }}
                  >
                    {module.title}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <List>
                    {module.lessons.map(
                      lesson => (
                        <ListItemButton
                          key={lesson.id}
                          onClick={() =>
                            navigate(
                              `/learner/lessons/${lesson.id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            {lesson.isCompleted ? (
                              <CheckCircleIcon
                                color="success"
                              />
                            ) : (
                              <PlayCircleIcon
                                color="primary"
                              />
                            )}
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              lesson.title
                            }
                          />
                        </ListItemButton>
                      )
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Grid>

        {/* Statistics */}

        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card
            sx={{
              borderRadius: 4
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600
                }}
              >
                Course Statistics
              </Typography>

              <Typography
                sx={{
                  mb: 2
                }}
              >
                Lessons Completed:
                {" "}
                {completedLessons}
              </Typography>

              <Typography
                sx={{
                  mb: 2
                }}
              >
                Total Lessons:
                {" "}
                {totalLessons}
              </Typography>

              <Typography>
                Progress:
                {" "}
                {progress}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetailsPage;