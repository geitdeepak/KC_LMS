import api from "../api/axios";

import type {
  MyCourse,
  CourseDetailsDto,
  LessonDto,
  LessonProgressDto
} from "../types/course";

import type {
  QuizDto,
  QuizQuestionDto,
  QuizResultDto,
  SubmitQuizRequest,
  QuizStatusDto
} from "../types/quiz";

import apiClient from "../api/apiClient";

export const getMyCourses =
  async (): Promise<MyCourse[]> => {
    const response =
      await api.get<MyCourse[]>(
        "/Learner/courses"
      );

    return response.data;
  };

export const getCourseDetails =
  async (
    courseId: string
  ): Promise<CourseDetailsDto> => {
    const response =
      await api.get<CourseDetailsDto>(
        `/Learner/courses/${courseId}`
      );

    return response.data;
  };

export const getLessonById =
  async (
    lessonId: string
  ): Promise<LessonDto> => {
    const response =
      await api.get<LessonDto>(
        `/Lessons/${lessonId}`
      );

    return response.data;
  };

export const completeLesson =
  async (
    lessonId: string
  ) => {
    const response =
      await api.post(
        `/Learner/lessons/${lessonId}/complete`
      );

    return response.data;
  };

export const getLessonProgress =
  async (
    lessonId: string
  ): Promise<LessonProgressDto | null> => {
    const response =
      await api.get<
        LessonProgressDto | null
      >(
        `/Learner/lessons/${lessonId}/progress`
      );

    return response.data;
  };

export const getQuizzesByLesson =
  async (
    lessonId: string
  ): Promise<QuizDto[]> => {
    const response =
      await api.get<QuizDto[]>(
        `/Quizzes/lesson/${lessonId}`
      );

    return response.data;
  };

export const getQuizQuestions =
  async (
    quizId: string
  ): Promise<QuizQuestionDto[]> => {
    const response =
      await api.get<
        QuizQuestionDto[]
      >(
        `/Quizzes/${quizId}/questions`
      );

    return response.data;
  };

export const submitQuiz =
  async (
    request: SubmitQuizRequest
  ): Promise<QuizResultDto> => {
    const response =
      await api.post<
        QuizResultDto
      >(
        "/Quizzes/submit",
        request
      );

    return response.data;
  };

export const getQuizStatus =
  async (
    quizId: string
  ): Promise<QuizStatusDto> => {
    const response =
      await api.get<
        QuizStatusDto
      >(
        `/Quizzes/${quizId}/status`
      );

    return response.data;
  };

  export const getCourses = async () => {

  const response = await apiClient.get("/courses");

  return response.data;

};