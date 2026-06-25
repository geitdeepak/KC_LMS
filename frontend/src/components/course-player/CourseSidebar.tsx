import {
  Avatar,
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

import {
  useState
} from "react";

import ExpandLessRoundedIcon
  from "@mui/icons-material/ExpandLessRounded";

import ExpandMoreRoundedIcon
  from "@mui/icons-material/ExpandMoreRounded";

import CheckCircleRoundedIcon
  from "@mui/icons-material/CheckCircleRounded";

import PlayCircleOutlineRoundedIcon
  from "@mui/icons-material/PlayCircleOutlineRounded";

import RadioButtonUncheckedRoundedIcon
  from "@mui/icons-material/RadioButtonUncheckedRounded";

import type {
  CourseDetailsDto,
  CourseLessonDto,
  LessonDto
} from "../../types/course";

interface Props {

  course: CourseDetailsDto;

  selectedLesson: LessonDto | null;

  onLessonSelect: (
    lessonId: string
  ) => void;

}

const CourseSidebar = ({
  course,
  selectedLesson,
  onLessonSelect
}: Props) => {

  const [
    expandedModules,
    setExpandedModules
  ] = useState<Record<string, boolean>>(() => {

    const state: Record<string, boolean> = {};

    course.modules.forEach(module => {

      state[module.id] = true;

    });

    return state;

  });

  const toggleModule = (
    moduleId: string
  ) => {

    setExpandedModules(prev => ({

      ...prev,

      [moduleId]: !prev[moduleId]

    }));

  };

  const renderLessonIcon = (
    lesson: CourseLessonDto
  ) => {

    if (lesson.isCompleted) {

      return (
        <CheckCircleRoundedIcon
          sx={{
            color: "#22C55E",
            fontSize: 22
          }}
        />
      );

    }

    if (
      selectedLesson?.id === lesson.id
    ) {

      return (
        <PlayCircleOutlineRoundedIcon
          sx={{
            color: "#6366F1",
            fontSize: 22
          }}
        />
      );

    }

    return (
      <RadioButtonUncheckedRoundedIcon
        sx={{
          color: "#64748B",
          fontSize: 20
        }}
      />
    );

  };

  return (

    <Box
      sx={{
        width: 340,
        flexShrink: 0,
        bgcolor: "#0E1729",
        borderRight:
          "1px solid rgba(255,255,255,.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >

      {/* ================= Course Header ================= */}

      <Box
        sx={{
          px: 3,
          pt: 4,
          pb: 3
        }}
      >

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            lineHeight: 1.4
          }}
        >
          {course.title}
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mt: 1,
            fontSize: 14,
            lineHeight: 1.6
          }}
        >
          {course.description}
        </Typography>

      </Box>

      <Divider
        sx={{
          borderColor:
            "rgba(255,255,255,.08)"
        }}
      />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          py: 2,

          "&::-webkit-scrollbar": {
            width: 6
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#334155",
            borderRadius: 20
          }
        }}
      >

        <Typography
          sx={{
            px: 3,
            pb: 2,
            color: "#94A3B8",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1
          }}
        >
          CURRICULUM
        </Typography>
                {course.modules.map((module, index) => (

          <Box
            key={module.id}
            sx={{
              mb: 1
            }}
          >

            {/* ================= Module ================= */}

            <ListItemButton
              onClick={() =>
                toggleModule(module.id)
              }
              sx={{
                mx: 2,
                borderRadius: 2,
                py: 1.2,
                px: 2,

                "&:hover": {
                  bgcolor: "rgba(255,255,255,.05)"
                }
              }}
            >

              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  mr: 2,
                  bgcolor: "#2563EB",
                  fontWeight: 700,
                  fontSize: 13
                }}
              >
                {index + 1}
              </Avatar>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: 15
                    }}
                  >
                    {module.title}
                  </Typography>
                }

                secondary={
                  <Typography
                    sx={{
                      color: "#94A3B8",
                      fontSize: 12
                    }}
                  >
                    {module.lessons.length} Lessons
                  </Typography>
                }
              />

              {

                expandedModules[module.id]

                  ? <ExpandLessRoundedIcon />

                  : <ExpandMoreRoundedIcon />

              }

            </ListItemButton>

            {/* ================= Lessons ================= */}

            <Collapse
              in={expandedModules[module.id]}
            >

              <List
                disablePadding
              >

                {module.lessons.map(
                  lesson => {

                    const isActive =
                      selectedLesson?.id ===
                      lesson.id;

                    return (

                      <ListItemButton
                        key={lesson.id}
                        onClick={() =>
                          onLessonSelect(
                            lesson.id
                          )
                        }
                        sx={{

                          mx: 2,

                          mb: .5,

                          py: 1.1,

                          px: 2,

                          borderRadius: 2,

                          bgcolor:
                            isActive
                              ? "rgba(99,102,241,.12)"
                              : "transparent",

                          borderLeft:
                            isActive
                              ? "3px solid #6366F1"
                              : "3px solid transparent",

                          "&:hover": {

                            bgcolor:
                              "rgba(255,255,255,.05)"

                          }

                        }}
                      >

                        <ListItemIcon
                          sx={{
                            minWidth: 36
                          }}
                        >

                          {renderLessonIcon(
                            lesson
                          )}

                        </ListItemIcon>

                        <ListItemText

                          primary={

                            <Typography
                              sx={{

                                color:
                                  isActive
                                    ? "white"
                                    : "#E2E8F0",

                                fontWeight:
                                  isActive
                                    ? 700
                                    : 500,

                                fontSize: 14

                              }}
                            >

                              {lesson.title}

                            </Typography>

                          }

                          secondary={

                            lesson.isCompleted

                              ? (

                                <Typography
                                  sx={{
                                    color:
                                      "#22C55E",
                                    fontSize: 12
                                  }}
                                >

                                  Completed

                                </Typography>

                              )

                              : (

                                <Typography
                                  sx={{
                                    color:
                                      "#64748B",
                                    fontSize: 12
                                  }}
                                >

                                  Lesson

                                </Typography>

                              )

                          }

                        />

                      </ListItemButton>

                    );

                  }

                )}

              </List>

            </Collapse>

          </Box>

        ))}

      </Box>

    </Box>

  );

};

export default CourseSidebar;