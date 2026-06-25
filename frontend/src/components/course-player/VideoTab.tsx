import {
  Alert,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import SmartDisplayRoundedIcon
  from "@mui/icons-material/SmartDisplayRounded";

import AccessTimeRoundedIcon
  from "@mui/icons-material/AccessTimeRounded";

import PlayCircleFilledRoundedIcon
  from "@mui/icons-material/PlayCircleFilledRounded";

import type {
  LessonDto
} from "../../types/course";

interface Props {

  lesson: LessonDto | null;

}

const VideoTab = ({
  lesson
}: Props) => {

  if (!lesson) {

    return (

      <Alert severity="info">

        No lesson selected.

      </Alert>

    );

  }

  const isYoutube =

    lesson.contentUrl.includes(
      "youtube.com"
    ) ||

    lesson.contentUrl.includes(
      "youtu.be"
    );

  const youtubeUrl =
    isYoutube

      ? lesson.contentUrl
          .replace(
            "watch?v=",
            "embed/"
          )
          .replace(
            "youtu.be/",
            "youtube.com/embed/"
          )

      : "";

  return (

    <Paper

      elevation={0}

      sx={{

        bgcolor: "#101B30",

        border:
          "1px solid rgba(255,255,255,.08)",

        borderRadius: 3,

        overflow: "hidden"

      }}

    >

      {/* ================= Header ================= */}

      <Box

        sx={{

          px: 4,

          py: 3,

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center"

        }}

      >

        <Typography

          variant="h4"

          sx={{

            color: "white",

            fontWeight: 700

          }}

        >

          Video Lesson

        </Typography>

        <Stack

          direction="row"

          spacing={2}

        >

          <Chip

            icon={
              <SmartDisplayRoundedIcon />
            }

            label={lesson.lessonType}

            color="primary"

          />

          <Chip

            icon={
              <AccessTimeRoundedIcon />
            }

            label="30 min"

            variant="outlined"

            sx={{

              color: "white",

              borderColor:
                "rgba(255,255,255,.15)"

            }}

          />

        </Stack>

      </Box>

      <Divider />
            {/* ================= Video Player ================= */}

      <Box
        sx={{
          bgcolor: "#000",
          aspectRatio: "16 / 9",
          width: "100%"
        }}
      >

        {

          lesson.contentUrl ? (

            isYoutube ? (

              <iframe
                width="100%"
                height="100%"
                src={youtubeUrl}
                title={lesson.title}
                allowFullScreen
                style={{
                  border: "none"
                }}
              />

            ) : (

              <video
                controls
                width="100%"
                height="100%"
                style={{
                  background: "#000"
                }}
              >

                <source
                  src={lesson.contentUrl}
                />

                Your browser does not support video playback.

              </video>

            )

          ) : (

            <Box
              sx={{
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >

              <PlayCircleFilledRoundedIcon
                sx={{
                  fontSize: 90,
                  color: "#475569",
                  mb: 2
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  mb: 1
                }}
              >

                Video Not Available

              </Typography>

              <Typography
                sx={{
                  color: "#94A3B8"
                }}
              >

                The instructor has not uploaded a video yet.

              </Typography>

            </Box>

          )

        }

      </Box>

      {/* ================= Lesson Details ================= */}

      <Box
        sx={{
          p: 4
        }}
      >

        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >

          {lesson.title}

        </Typography>

        <Typography
          sx={{
            color: "#CBD5E1",
            lineHeight: 2,
            fontSize: 17,
            mb: 4
          }}
        >

          {lesson.description}

        </Typography>

        <Divider
          sx={{
            borderColor:
              "rgba(255,255,255,.08)",
            mb: 4
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >

          Learning Objectives

        </Typography>

        <Box
          component="ul"
          sx={{
            color: "#CBD5E1",
            pl: 3,
            lineHeight: 2,
            mb: 4
          }}
        >

          <li>
            Understand the core concepts of this lesson.
          </li>

          <li>
            Follow along with the practical demonstration.
          </li>

          <li>
            Apply the concepts in the project section.
          </li>

          <li>
            Complete the quiz to verify your understanding.
          </li>

        </Box>

        <Divider
          sx={{
            borderColor:
              "rgba(255,255,255,.08)",
            mb: 4
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >

          Resources

        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            lineHeight: 1.8
          }}
        >

          • Lecture Notes

          <br />

          • Sample Files

          <br />

          • Project Source Code

          <br />

          • Practice Quiz

        </Typography>

      </Box>

    </Paper>

  );

};

export default VideoTab;