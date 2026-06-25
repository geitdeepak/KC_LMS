import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  LinearProgress,
  Chip,
  Box
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getMyCourses
} from "../../services/courseService";

import type {
  MyCourse
} from "../../types/course";

const CoursesPage = () => {
  const navigate =
    useNavigate();

  const [courses, setCourses] =
    useState<MyCourse[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses =
    async () => {
      const result =
        await getMyCourses();

      setCourses(result);
    };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4
      }}
    >
      {/* Header */}

      <Box
        sx={{
          mb: 4
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700
          }}
          gutterBottom
        >
          My Learning
        </Typography>

        <Typography
          color="text.secondary"
        >
          Continue where you left off.
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
      >
        {courses.map(
          course => (
            <Grid
              key={course.id}
              size={{
                xs: 12,
                sm: 6,
                lg: 4
              }}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  height: "100%",
                  transition:
                    "all 0.3s ease",
                  "&:hover": {
                    transform:
                      "translateY(-6px)"
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={
                    course.thumbnailUrl
                  }
                  alt={course.title}
                />

                <CardContent>
                  <Chip
                    label={
                      course.category
                    }
                    size="small"
                    sx={{
                      mb: 2
                    }}
                  />

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600
                    }}
                  >
                    {course.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 2
                    }}
                  >
                    Progress:
                    {" "}
                    {course.progress}%
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={
                      course.progress
                    }
                    sx={{
                      height: 10,
                      borderRadius: 10,
                      mb: 3
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() =>
                      navigate(
`/course-player/${course.id}`
)
                    }
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default CoursesPage;