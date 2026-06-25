import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import {
  getMyCourses
} from "../../services/myCoursesService";

import type {
  MyCourse
} from "../../types/myCourse";

import MyCourseCard
  from "./MyCourseCard";

const MyCoursesSection = () => {

  const [courses,
    setCourses] =
    useState<MyCourse[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    loadCourses();

  }, []);

  const loadCourses =
    async () => {

      try {

        setLoading(true);

        const result =
          await getMyCourses();

        setCourses(result);

      }

      catch {

        setError(
          "Unable to load your courses."
        );

      }

      finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 6
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  if (error) {

    return (

      <Alert severity="error">

        {error}

      </Alert>

    );

  }

  if (courses.length === 0) {

    return (

      <Typography
        color="text.secondary"
      >

        You haven't enrolled in any courses yet.

      </Typography>

    );

  }

  return (

    <>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3
        }}
      >

        My Courses

      </Typography>

      <Grid
        container
        spacing={3}
      >

        {

          courses.map(course => (

            <Grid
              key={course.id}
              size={{
                xs: 12,
                md: 6,
                lg: 4
              }}
            >

              <MyCourseCard
                course={course}
              />

            </Grid>

          ))

        }

      </Grid>

    </>

  );

};

export default MyCoursesSection;