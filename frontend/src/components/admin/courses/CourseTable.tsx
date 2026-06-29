import {
  Box,
  Divider,
  Typography
} from "@mui/material";

import KCSearch
  from "../../../kc/form/KCSearch";

import KCCard
  from "../../../kc/card/KCCard";

import KCTable, {
  type KCTableColumn
} from "../../../kc/table/KCTable";

import KCStatusChip
  from "../../../kc/table/KCStatusChip";

import KCTableActions
  from "../../../kc/table/KCTableActions";

import {
  useCourses
} from "../../../hooks/useCourses";

import type {
  Course
} from "../../../types/course";

const CourseTable = () => {

  const {

    data = [],

    isLoading,

    isError

  } = useCourses();

  const columns: KCTableColumn<Course>[] = [

    {

      id: "title",

      label: "Course"

    },

    {

      id: "category",

      label: "Category"

    },

    {

      id: "level",

      label: "Level"

    },

    {

      id: "status",

      label: "Status",

      render: (value) => (

        <KCStatusChip

          status={String(value)}

        />

      )

    },

    {

      id: "id",

      label: "Actions",

      align: "center",

      render: (_, row) => (

        <KCTableActions

          onEdit={() =>

            console.log(

              "Edit",

              row.id

            )

          }

          onPublish={() =>

            console.log(

              "Publish",

              row.id

            )

          }

          onDelete={() =>

            console.log(

              "Delete",

              row.id

            )

          }

        />

      )

    }

  ];

  return (

    <KCCard>

      <Box
        sx={{
          p: 3
        }}
      >

        <Box
          sx={{
            width: 420,
            maxWidth: "100%"
          }}
        >

          <KCSearch

            placeholder="Search Courses..."

          />

        </Box>

      </Box>

      <Divider />

      <Box
        sx={{
          p: 3
        }}
      >

        {

          isLoading ?

          (

            <Typography>

              Loading courses...

            </Typography>

          )

          :

          isError ?

          (

            <Typography
              color="error"
            >

              Failed to load courses.

            </Typography>

          )

          :

          (

            <KCTable

              columns={columns}

              rows={data}

            />

          )

        }

      </Box>

    </KCCard>

  );

};

export default CourseTable;