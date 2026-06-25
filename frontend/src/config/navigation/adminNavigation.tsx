import DashboardRoundedIcon
  from "@mui/icons-material/DashboardRounded";

import SchoolRoundedIcon
  from "@mui/icons-material/SchoolRounded";

import ViewModuleRoundedIcon
  from "@mui/icons-material/ViewModuleRounded";

import MenuBookRoundedIcon
  from "@mui/icons-material/MenuBookRounded";

import PeopleRoundedIcon
  from "@mui/icons-material/PeopleRounded";

import WorkspacePremiumRoundedIcon
  from "@mui/icons-material/WorkspacePremiumRounded";

import AssessmentRoundedIcon
  from "@mui/icons-material/AssessmentRounded";

import SettingsRoundedIcon
  from "@mui/icons-material/SettingsRounded";

import type {
  SvgIconComponent
} from "@mui/icons-material";

export interface AdminNavigationItem {

  id: string;

  title: string;

  path: string;

  icon: SvgIconComponent;

}

const adminNavigation: AdminNavigationItem[] = [

  {

    id: "dashboard",

    title: "Dashboard",

    path: "/admin/dashboard",

    icon: DashboardRoundedIcon

  },

  {

    id: "courses",

    title: "Courses",

    path: "/admin/courses",

    icon: SchoolRoundedIcon

  },

  {

    id: "modules",

    title: "Modules",

    path: "/admin/modules",

    icon: ViewModuleRoundedIcon

  },

  {

    id: "lessons",

    title: "Lessons",

    path: "/admin/lessons",

    icon: MenuBookRoundedIcon

  },

  {

    id: "students",

    title: "Students",

    path: "/admin/students",

    icon: PeopleRoundedIcon

  },

  {

    id: "certificates",

    title: "Certificates",

    path: "/admin/certificates",

    icon: WorkspacePremiumRoundedIcon

  },

  {

    id: "reports",

    title: "Reports",

    path: "/admin/reports",

    icon: AssessmentRoundedIcon

  },

  {

    id: "settings",

    title: "Settings",

    path: "/admin/settings",

    icon: SettingsRoundedIcon

  }

];

export default adminNavigation;