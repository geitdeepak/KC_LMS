import {
  useEffect,
  useState
} from "react";

import {
  Box,
  CircularProgress
} from "@mui/material";

import {
  useParams
} from "react-router-dom";

import {
  getCourseDetails,
  getLessonById
} from "../../../services/courseService";

import type {
  CourseDetailsDto,
  LessonDto
} from "../../../types/course";

import CourseSidebar
  from "../../../components/course-player/CourseSidebar";

import LessonTabs
  from "../../../components/course-player/LessonTabs";

const CoursePlayerPage = () => {

  const { courseId } =
    useParams();

  const [
    course,
    setCourse
  ] =
    useState<CourseDetailsDto | null>(
      null
    );

  const [
    selectedLesson,
    setSelectedLesson
  ] =
    useState<LessonDto | null>(
      null
    );

  const [
    loading,
    setLoading
  ] =
    useState(true);

  useEffect(() => {

    if (courseId) {

      loadCourse();

    }

  }, [courseId]);

  const loadCourse =
    async () => {

      try {

        const result =
          await getCourseDetails(
            courseId!
          );

        setCourse(result);

        const firstLesson =
          result.modules
            .flatMap(
              module => module.lessons
            )[0];

        if (firstLesson) {

          const lesson =
            await getLessonById(
              firstLesson.id
            );

          setSelectedLesson(
            lesson
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

  const handleLessonSelect =
    async (
      lessonId: string
    ) => {

      try {

        const lesson =
          await getLessonById(
            lessonId
          );

        setSelectedLesson(
          lesson
        );

      }

      catch (error) {

        console.error(error);

      }

    };

  if (loading) {

    return (

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  if (!course) {

    return null;

  }

  return (

    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 72px)",
        bgcolor: "#07111F"
      }}
    >

      <CourseSidebar
        course={course}
        selectedLesson={selectedLesson}
        onLessonSelect={handleLessonSelect}
      />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 3
        }}
      >

        <LessonTabs
          lesson={selectedLesson}
        />

      </Box>

    </Box>

  );

};

export default CoursePlayerPage;