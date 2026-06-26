import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage
  from "../pages/Login/LoginPage";

import RegisterPage
  from "../pages/Register/RegisterPage";

import UnauthorizedPage
  from "../pages/Unauthorized/UnauthorizedPage";

import NotFoundPage
  from "../pages/NotFound/NotFoundPage";

/* Learner */

import LearnerLayout
  from "../layouts/LearnerLayout";

import DashboardPage
  from "../pages/Learner/DashboardPage";

import LearnerCoursesPage
  from "../pages/Learner/CoursesPage";

import LessonPage
  from "../pages/Learner/LessonPage";

import QuizPage
  from "../pages/Learner/QuizPage";

import CertificatesPage
  from "../pages/Learner/CertificatesPage";

/* Course Player */

import CoursePlayerLayout
  from "../layouts/CoursePlayerLayout";

import CoursePlayerPage
  from "../pages/Learner/CoursePlayer/CoursePlayerPage";

/* Admin */

import AdminLayout
  from "../layouts/AdminLayout";

import AdminDashboardPage
  from "../pages/Admin/Dashboard/DashboardPage";

import AdminCoursesPage
  from "../pages/Admin/Courses/CoursesPage";

const AppRoutes = () => {

  return (

    <Routes>

      {/* Root */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* Authentication */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/unauthorized"
        element={<UnauthorizedPage />}
      />

      {/* Learner */}

      <Route
        path="/learner"
        element={<LearnerLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="courses"
          element={<LearnerCoursesPage />}
        />

        <Route
          path="lessons/:lessonId"
          element={<LessonPage />}
        />

        <Route
          path="quizzes/:quizId"
          element={<QuizPage />}
        />

        <Route
          path="certificates"
          element={<CertificatesPage />}
        />

      </Route>

      {/* Course Player */}

      <Route
        path="/course-player"
        element={<CoursePlayerLayout />}
      >

        <Route
          path=":courseId"
          element={<CoursePlayerPage />}
        />

      </Route>

      {/* Admin */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<AdminDashboardPage />}
        />

        <Route
          path="courses"
          element={<AdminCoursesPage />}
        />

      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>

  );

};

export default AppRoutes;