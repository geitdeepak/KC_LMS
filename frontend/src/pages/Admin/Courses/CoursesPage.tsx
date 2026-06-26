import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material";

import CourseToolbar
  from "../../../components/admin/courses/CourseToolbar";

import {
  useCourses
} from "../../../hooks/useCourses";

const CoursesPage = () => {

  const {

    data,

    isLoading,

    error

  } = useCourses();

  return (

    <Box
      sx={{

        maxWidth: 1400,

        mx: "auto",

        p: 4

      }}
    >

      <CourseToolbar />

      {

        isLoading && (

          <CircularProgress />

        )

      }

      {

        error && (

          <Typography
            color="error"
          >

            Failed to load courses.

          </Typography>

        )

      }

      {

        data?.map(course => (

          <Box

            key={course.id}

            sx={{

              p: 2,

              mb: 2,

              border: "1px solid #374151",

              borderRadius: 2

            }}

          >

            <Typography
              variant="h6"
            >

              {course.title}

            </Typography>

            <Typography>

              {course.category}

            </Typography>

            <Typography>

              {course.level}

            </Typography>

            <Typography>

              {course.status}

            </Typography>

          </Box>

        ))

      }

    </Box>

  );

};

export default CoursesPage;