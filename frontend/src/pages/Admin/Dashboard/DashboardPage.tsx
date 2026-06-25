import {
  Grid
} from "@mui/material";

import SchoolRoundedIcon
  from "@mui/icons-material/SchoolRounded";

import ViewModuleRoundedIcon
  from "@mui/icons-material/ViewModuleRounded";

import MenuBookRoundedIcon
  from "@mui/icons-material/MenuBookRounded";

import PeopleRoundedIcon
  from "@mui/icons-material/PeopleRounded";

import PageHeader
  from "../../../layouts/PageHeader";

import StatCard
  from "../../../components/admin/cards/StatCard";



const DashboardPage = () => {

  return (

    <>

      <PageHeader

        title="Dashboard"

        description="Welcome back, Administrator."

        breadcrumbs={[

          {

            label: "Dashboard"

          }

        ]}

      />

      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 3 }}>

          <StatCard

            title="Courses"

            value={12}

            subtitle="+2 this month"

            icon={<SchoolRoundedIcon />}

          />

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <StatCard

            title="Modules"

            value={48}

            subtitle="+5 this month"

            icon={<ViewModuleRoundedIcon />}

          />

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <StatCard

            title="Lessons"

            value={316}

            subtitle="+18 this month"

            icon={<MenuBookRoundedIcon />}

          />

        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          <StatCard

            title="Students"

            value={1850}

            subtitle="+67 this month"

            icon={<PeopleRoundedIcon />}

          />

        </Grid>

      </Grid>

    </>

  );

};

export default DashboardPage;