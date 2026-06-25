import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Chip,
  Box,
  Grid
} from "@mui/material";

import WorkspacePremiumIcon
  from "@mui/icons-material/WorkspacePremium";

import DownloadIcon
  from "@mui/icons-material/Download";

import VisibilityIcon
  from "@mui/icons-material/Visibility";

import {
  useEffect,
  useState
} from "react";

import {
  getMyCertificates
} from "../../services/certificateService";

import type {
  CertificateDto
} from "../../types/certificate";

const CertificatesPage = () => {

  const [
    certificates,
    setCertificates
  ] = useState<
    CertificateDto[]
  >([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    const loadCertificates =
      async () => {

        try {

          const data =
            await getMyCertificates();

          setCertificates(
            data
          );
        }
        finally {

          setLoading(
            false
          );
        }
      };

    loadCertificates();

  }, []);

  if (loading) {

    return (
      <Container
        sx={{
          mt: 10,
          textAlign: "center"
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700
        }}
      >
        My Certificates
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4
        }}
      >
        Certificates earned
        through your learning
        journey.
      </Typography>

      {certificates.length === 0 && (

        <Card>
          <CardContent>

            <Typography
              align="center"
            >
              No certificates
              earned yet.
            </Typography>

          </CardContent>
        </Card>

      )}

      <Grid
        container
        spacing={3}
      >
        {certificates.map(
          certificate => (

            <Grid
              key={
                certificate.id
              }
              size={{
                xs: 12,
                md: 6
              }}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%"
                }}
              >
                <CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      mb: 3
                    }}
                  >
                    <WorkspacePremiumIcon
                      color="warning"
                      sx={{
                        fontSize: 48
                      }}
                    />

                    <Chip
                      color="success"
                      label="Certified"
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600
                    }}
                  >
                    {
                      certificate.courseTitle
                    }
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 1
                    }}
                  >
                    Certificate No:
                  </Typography>

                  <Typography
                    sx={{
                      mb: 2
                    }}
                  >
                    {
                      certificate.certificateNumber
                    }
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 1
                    }}
                  >
                    Issued On:
                  </Typography>

                  <Typography
                    sx={{
                      mb: 3
                    }}
                  >
                    {
                      new Date(
                        certificate.issuedAt
                      )
                      .toLocaleDateString()
                    }
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={
                        <VisibilityIcon />
                      }
                    >
                      View
                    </Button>

                    <Button
                      variant="contained"
                      startIcon={
                        <DownloadIcon />
                      }
                    >
                      Download
                    </Button>
                  </Box>

                </CardContent>
              </Card>
            </Grid>

          )
        )}
      </Grid>
    </Container>
  );
};

export default CertificatesPage;