import {
  Alert,
  Box,
  Chip,
  Divider,
  Paper,
  Typography
} from "@mui/material";

import DescriptionRoundedIcon
  from "@mui/icons-material/DescriptionRounded";

import ArticleRoundedIcon
  from "@mui/icons-material/ArticleRounded";

import type {
  LessonDto
} from "../../types/course";

interface Props {

  lesson: LessonDto | null;

}

const NotesTab = ({
  lesson
}: Props) => {

  if (!lesson) {

    return (

      <Alert severity="info">

        No lesson selected.

      </Alert>

    );

  }

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

          {lesson.title}

        </Typography>

        <Chip

          icon={
            <DescriptionRoundedIcon />
          }

          label={lesson.lessonType}

          color="primary"

        />

      </Box>

      <Divider />

      <Box

        sx={{

          px: 4,

          py: 4

        }}

      >

        <Typography

          variant="h5"

          sx={{

            color: "white",

            mb: 3,

            fontWeight: 700

          }}

        >

          Lesson Notes

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
                {/* ================= Embedded Notes ================= */}

        {

          lesson.contentUrl ? (

            lesson.contentUrl
              .toLowerCase()
              .endsWith(".pdf") ? (

              <Box
                sx={{
                  height: "900px",
                  borderRadius: 2,
                  overflow: "hidden",
                  border:
                    "1px solid rgba(255,255,255,.08)"
                }}
              >

                <iframe
                  title="Lesson Notes"
                  src={lesson.contentUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: "none"
                  }}
                />

              </Box>

            ) :

            lesson.contentUrl
              .toLowerCase()
              .endsWith(".html") ? (

              <Box
                sx={{
                  height: "900px",
                  borderRadius: 2,
                  overflow: "hidden",
                  border:
                    "1px solid rgba(255,255,255,.08)"
                }}
              >

                <iframe
                  title="Lesson Notes"
                  src={lesson.contentUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: "none",
                    background: "white"
                  }}
                />

              </Box>

            ) : (

              <Alert severity="warning">

                Notes format is currently
                not supported.

              </Alert>

            )

          ) : (

            <Alert severity="info">

              Notes have not been uploaded
              for this lesson.

            </Alert>

          )

        }

        <Divider
          sx={{
            my: 4
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >

          <ArticleRoundedIcon
            color="primary"
          />

          <Typography
            sx={{
              color: "#94A3B8"
            }}
          >

            Tip:
            You can read the complete
            lesson without leaving the
            Course Player.

          </Typography>

        </Box>

      </Box>

    </Paper>

  );

};

export default NotesTab;