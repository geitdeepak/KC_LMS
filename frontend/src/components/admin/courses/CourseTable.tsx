import {
  Box,
  Divider
} from "@mui/material";

import KCSearch
  from "../../../kc/form/KCSearch";

import KCCard
  from "../../../kc/card/KCCard";

const CourseTable = () => {

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

          height: 300,

          display: "flex",

          justifyContent: "center",

          alignItems: "center"

        }}
      >

        Course Table Coming Soon...

      </Box>

    </KCCard>

  );

};

export default CourseTable;