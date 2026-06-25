import {
  Box,
  Divider,
  Tab,
  Tabs
} from "@mui/material";

import {
  useMemo,
  useState
} from "react";

import type {
  SyntheticEvent
} from "react";

import DescriptionOutlinedIcon
  from "@mui/icons-material/DescriptionOutlined";

import SmartDisplayRoundedIcon
  from "@mui/icons-material/SmartDisplayRounded";

import TerminalRoundedIcon
  from "@mui/icons-material/TerminalRounded";

import QuizRoundedIcon
  from "@mui/icons-material/QuizRounded";

import type {
  LessonDto
} from "../../types/course";



import NotesTab
  from "./NotesTab";

import VideoTab
  from "./VideoTab";

import ProjectTab
  from "./ProjectTab";

import QuizTab
  from "./QuizTab";

import CourseFooter
  from "./CourseFooter";

interface Props {

  lesson: LessonDto | null;

}

const LessonTabs = ({
  lesson
}: Props) => {

  /**
   * Default Behaviour
   *
   * If lesson has a video
   * open Video tab first.
   *
   * Otherwise
   * open Notes.
   */

  const defaultTab =
    useMemo(() => {

      if (!lesson) {

        return 0;

      }

      return lesson.contentUrl

        ? 1

        : 0;

    }, [lesson]);

  const [
    activeTab,
    setActiveTab
  ] =
    useState(defaultTab);

  if (!lesson) {

    return null;

  }

  const handleChange = (

    _: SyntheticEvent,

    newValue: number

  ) => {

    setActiveTab(
      newValue
    );

  };

  return (

    <Box>

      

      {/* ================= Tabs ================= */}

      <Tabs
  value={activeTab}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons="auto"
  sx={{
    mb: 3,

    "& .MuiTabs-flexContainer": {
      gap: 2
    },

    "& .MuiTab-root": {
      minHeight: 58,
      color: "#94A3B8",
      fontWeight: 600,
      textTransform: "none",
      fontSize: 15,
      px: 2,
      borderRadius: "12px 12px 0 0"
    },

    "& .Mui-selected": {
      color: "#ffffff"
    },

    "& .MuiTabs-indicator": {
      height: 3,
      borderRadius: 10
    }
  }}
>
        <Tab

          icon={
            <DescriptionOutlinedIcon />
          }

          iconPosition="start"

          label="Notes"

        />

        <Tab

          icon={
            <SmartDisplayRoundedIcon />
          }

          iconPosition="start"

          label="Video"

        />

        <Tab

          icon={
            <TerminalRoundedIcon />
          }

          iconPosition="start"

          label="Project"

        />

        <Tab

          icon={
            <QuizRoundedIcon />
          }

          iconPosition="start"

          label="Quiz"

        />

      </Tabs>

      <Divider
        sx={{
          display: "none"
        }}
      />

      {/* ================= Content ================= */}

            {

        activeTab === 0 && (

          <Box
            sx={{
              minHeight: "60vh"
            }}
          >

            <NotesTab
              lesson={lesson}
            />

          </Box>

        )

      }

      {

        activeTab === 1 && (

          <Box
            sx={{
              minHeight: "60vh"
            }}
          >

            <VideoTab
              lesson={lesson}
            />

          </Box>

        )

      }

      {

        activeTab === 2 && (

          <Box
            sx={{
              minHeight: "60vh"
            }}
          >

            <ProjectTab
              lesson={lesson}
            />

          </Box>

        )

      }

      {

        activeTab === 3 && (

          <Box
            sx={{
              minHeight: "60vh"
            }}
          >

            <QuizTab
              lesson={lesson}
            />

          </Box>

        )

      }

      {/* ================= Footer ================= */}

      <Divider

        sx={{

          mt: 6,

          mb: 4,

          borderColor:
            "rgba(255,255,255,.08)"

        }}

      />

      <CourseFooter />

    </Box>

  );

};

export default LessonTabs;