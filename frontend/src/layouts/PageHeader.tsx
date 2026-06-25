import {
  Box,
  Button,
  
  Typography
} from "@mui/material";

import type {
  ReactNode
} from "react";

import AdminBreadcrumb, {
  type BreadcrumbItem
} from "./AdminBreadcrumb";

interface Props {

  title: string;

  description?: string;

  breadcrumbs: BreadcrumbItem[];

  buttonText?: string;

  buttonIcon?: ReactNode;

  onButtonClick?: () => void;

}

const PageHeader = ({
  title,
  description,
  breadcrumbs,
  buttonText,
  buttonIcon,
  onButtonClick
}: Props) => {

  return (

    <Box
      sx={{
        mb: 4
      }}
    >

      {/* ================= Breadcrumb ================= */}

      <AdminBreadcrumb
        items={breadcrumbs}
      />

      {/* ================= Header ================= */}

      <Box
  sx={{
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>

        <Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700
            }}
          >

            {title}

          </Typography>

          {

            description && (

              <Typography
                sx={{
                  mt: 1,
                  color: "#6B7280"
                }}
              >

                {description}

              </Typography>

            )

          }

        </Box>

        {

          buttonText && (

            <Button

              variant="contained"

              startIcon={buttonIcon}

              onClick={onButtonClick}

            >

              {buttonText}

            </Button>

          )

        }

      </Box>

    </Box>

  );

};

export default PageHeader;