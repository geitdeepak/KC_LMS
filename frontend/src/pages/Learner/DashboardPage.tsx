import {
  useEffect,
  useState
} from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@mui/material";

import SchoolIcon
  from "@mui/icons-material/School";

import MenuBookIcon
  from "@mui/icons-material/MenuBook";

import EmojiEventsIcon
  from "@mui/icons-material/EmojiEvents";

import TrendingUpIcon
  from "@mui/icons-material/TrendingUp";

import {
  getLearnerDashboard
} from "../../services/dashboardService";

import type {
  LearnerDashboard
} from "../../types/dashboard";

import WelcomeBanner
  from "../../components/dashboard/WelcomeBanner";

import ContinueLearningCard
  from "../../components/dashboard/ContinueLearningCard";

import DashboardStatCard
  from "../../components/dashboard/DashboardStatCard";

import MyCoursesSection
  from "../../components/dashboard/MyCoursesSection";

import LearningProgressCard
  from "../../components/dashboard/LearningProgressCard";

import RecentActivityCard
  from "../../components/dashboard/RecentActivityCard";

const DashboardPage = () => {

  const [dashboard,
    setDashboard] =
    useState<LearnerDashboard | null>(
      null
    );

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        setLoading(true);

        const result =
          await getLearnerDashboard();

        setDashboard(result);

      }

      catch {

        setError(
          "Failed to load dashboard."
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
          alignItems: "center",
          minHeight: "60vh"
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

  if (!dashboard) {

    return null;

  }

  return (

    <Container
      maxWidth="xl"
      disableGutters
    >

      {/* Welcome Banner */}

      <WelcomeBanner />

      {/* Continue Learning */}

      <Box
        sx={{
          mt: 4,
          mb: 5
        }}
      >

        <ContinueLearningCard />

      </Box>

      {/* Learning Overview */}

      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700
        }}
      >

        Learning Overview

      </Typography>

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <DashboardStatCard
            title="Enrollments"
            value={dashboard.totalEnrollments}
            icon={<SchoolIcon />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <DashboardStatCard
            title="Lessons Completed"
            value={dashboard.lessonsCompleted}
            icon={<MenuBookIcon />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <DashboardStatCard
            title="Courses Completed"
            value={dashboard.coursesCompleted}
            icon={<EmojiEventsIcon />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}
        >

          <DashboardStatCard
            title="Overall Progress"
            value={`${dashboard.overallProgress}%`}
            icon={<TrendingUpIcon />}
          />

        </Grid>

      </Grid>

      {/* My Courses */}

      <Box
        sx={{
          mt: 6,
          mb: 6
        }}
      >

        <MyCoursesSection />

      </Box>

      {/* Learning Progress */}

      <Box
        sx={{
          mt: 4
        }}
      >

        <LearningProgressCard
          progress={
            dashboard.overallProgress
          }
        />

      </Box>

      {/* Recent Activity */}

      <Box
        sx={{
          mt: 5,
          mb: 5
        }}
      >

        <RecentActivityCard />

      </Box>

    </Container>

  );

};

export default DashboardPage;