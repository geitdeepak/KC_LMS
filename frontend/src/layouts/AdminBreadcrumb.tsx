import {
  Breadcrumbs,
  Link,
  Typography
} from "@mui/material";

import NavigateNextRoundedIcon
  from "@mui/icons-material/NavigateNextRounded";

import {
  Link as RouterLink
} from "react-router-dom";

export interface BreadcrumbItem {

  label: string;

  href?: string;

}

interface Props {

  items: BreadcrumbItem[];

}

const AdminBreadcrumb = ({
  items
}: Props) => {

  return (

    <Breadcrumbs

      separator={
        <NavigateNextRoundedIcon
          fontSize="small"
        />
      }

      sx={{
        mb: 1
      }}

    >

      {

        items.map((item, index) => {

          const last =
            index === items.length - 1;

          if (last) {

            return (

              <Typography

                key={item.label}

                sx={{
                  color: "#111827",
                  fontWeight: 600
                }}

              >

                {item.label}

              </Typography>

            );

          }

          return (

            <Link

              key={item.label}

              component={RouterLink}

              underline="hover"

              color="inherit"

              to={item.href || "#"}

              sx={{
                color: "#6B7280"
              }}

            >

              {item.label}

            </Link>

          );

        })

      }

    </Breadcrumbs>

  );

};

export default AdminBreadcrumb;