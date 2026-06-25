import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import AssignmentTurnedInRoundedIcon
  from "@mui/icons-material/AssignmentTurnedInRounded";

import DownloadRoundedIcon
  from "@mui/icons-material/DownloadRounded";

import FolderZipRoundedIcon
  from "@mui/icons-material/FolderZipRounded";

import AccessTimeRoundedIcon
  from "@mui/icons-material/AccessTimeRounded";

import type {
  LessonDto
} from "../../types/course";

interface Props {

  lesson: LessonDto | null;

}

const ProjectTab = ({
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

        borderRadius: 3,

        border:
          "1px solid rgba(255,255,255,.08)",

        overflow: "hidden"

      }}

    >

      {/* Header */}

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

          Project Assignment

        </Typography>

        <Chip

          icon={
            <AssignmentTurnedInRoundedIcon />
          }

          color="success"

          label="Hands-on"

        />

      </Box>

      <Divider />

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

          {lesson.title} Project

        </Typography>

        <Typography
          sx={{
            color: "#CBD5E1",
            lineHeight: 2,
            fontSize: 17,
            mb: 4
          }}
        >

          Apply the concepts learned in this lesson
          by completing the practical assignment
          below.

        </Typography>

        <Divider
          sx={{
            mb: 4,
            borderColor:
              "rgba(255,255,255,.08)"
          }}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 4,
            flexWrap: "wrap"
          }}
        >

          <Chip

            icon={
              <AccessTimeRoundedIcon />
            }

            label="Estimated Time : 45 Minutes"

            color="primary"

          />

          <Chip

            label="Difficulty : Intermediate"

            color="warning"

          />

          <Chip

            label="Marks : 100"

            color="secondary"

          />

        </Stack>
                {/* ================= Objectives ================= */}

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >
          Project Objectives
        </Typography>

        <Box
          component="ul"
          sx={{
            color: "#CBD5E1",
            lineHeight: 2,
            pl: 3,
            mb: 4
          }}
        >
          <li>
            Implement the concepts covered in this lesson.
          </li>

          <li>
            Build a working solution using industry best practices.
          </li>

          <li>
            Gain hands-on experience through practical implementation.
          </li>

          <li>
            Prepare yourself for real-world development scenarios.
          </li>
        </Box>

        <Divider
          sx={{
            mb: 4,
            borderColor: "rgba(255,255,255,.08)"
          }}
        />

        {/* ================= Deliverables ================= */}

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >
          Deliverables
        </Typography>

        <Box
          component="ul"
          sx={{
            color: "#CBD5E1",
            lineHeight: 2,
            pl: 3,
            mb: 4
          }}
        >
          <li>Source Code</li>

          <li>Configuration Files</li>

          <li>Project Documentation</li>

          <li>Screenshots (if applicable)</li>
        </Box>

        <Divider
          sx={{
            mb: 4,
            borderColor: "rgba(255,255,255,.08)"
          }}
        />

        {/* ================= Resources ================= */}

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 3
          }}
        >
          Project Resources
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          sx={{
            mb: 5,
            flexWrap: "wrap"
          }}
        >
          <Button
            variant="contained"
            startIcon={
              <FolderZipRoundedIcon />
            }
            disabled
          >
            Download Starter Files
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <DownloadRoundedIcon />
            }
            disabled
          >
            Download Solution
          </Button>
        </Stack>

        <Divider
          sx={{
            mb: 4,
            borderColor: "rgba(255,255,255,.08)"
          }}
        />

        {/* ================= Submission ================= */}

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2
          }}
        >
          Submission
        </Typography>

        <Typography
          sx={{
            color: "#CBD5E1",
            lineHeight: 1.8,
            mb: 4
          }}
        >
          Submit your completed project once all
          objectives have been achieved. In the next
          phase of the LMS, project upload, mentor
          review and grading will be available.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            variant="contained"
            size="large"
            disabled
          >
            Start Project
          </Button>

          <Button
            variant="outlined"
            size="large"
            disabled
          >
            Submit Project
          </Button>
        </Stack>

      </Box>

    </Paper>

  );

};

export default ProjectTab;