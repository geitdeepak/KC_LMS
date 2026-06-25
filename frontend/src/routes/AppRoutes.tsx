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

import LearnerLayout
  from "../layouts/LearnerLayout";

import CoursePlayerLayout
  from "../layouts/CoursePlayerLayout";

import DashboardPage
  from "../pages/Learner/DashboardPage";

import CoursesPage
  from "../pages/Learner/CoursesPage";

import CoursePlayerPage
  from "../pages/Learner/CoursePlayer/CoursePlayerPage";

import LessonPage
  from "../pages/Learner/LessonPage";

import QuizPage
  from "../pages/Learner/QuizPage";

import CertificatesPage
  from "../pages/Learner/CertificatesPage";

import AdminLayout
  from "../layouts/AdminLayout";

import AdminDashboardPage
  from "../pages/Admin/Dashboard/DashboardPage";

const AppRoutes = () => {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

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

      {/* Dashboard Layout */}

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
          element={<CoursesPage />}
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

      {/* Dedicated Course Player */}

      <Route
        path="/course-player"
        element={<CoursePlayerLayout />}
      >

        <Route
          path=":courseId"
          element={<CoursePlayerPage />}
        />

      </Route>
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

    </Route>
      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>

  );

};

export default AppRoutes;