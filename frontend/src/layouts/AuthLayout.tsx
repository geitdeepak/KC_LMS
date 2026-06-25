import {
  Box,
  Typography
} from "@mui/material";

import KCCard
  from "../kc/card/KCCard";

interface Props {

  children: React.ReactNode;

}

const AuthLayout = ({
  children
}: Props) => {

  return (

    <Box
      sx={{

        width: "100vw",

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        position: "relative",

        overflow: "hidden",

        background:
          "linear-gradient(135deg,#020617 0%,#0F172A 55%,#1E3A8A 100%)"

      }}
    >

      {/* Top Glow */}

      <Box
        sx={{

          position: "absolute",

          top: -180,

          right: -180,

          width: 360,

          height: 360,

          borderRadius: "50%",

          background:
            "rgba(99,102,241,.18)",

          filter:
            "blur(120px)"

        }}
      />

      {/* Bottom Glow */}

      <Box
        sx={{

          position: "absolute",

          bottom: -180,

          left: -180,

          width: 340,

          height: 340,

          borderRadius: "50%",

          background:
            "rgba(14,165,233,.12)",

          filter:
            "blur(120px)"

        }}
      />

      <KCCard
        sx={{

          width: 380,

          p: 4,

          borderRadius: 4,

          background:
            "#111827",

          zIndex: 10

        }}
      >

        <Box
          sx={{

            display: "flex",

            justifyContent: "center",

            mb: 2

          }}
        >

          <Box
            sx={{

              width: 54,

              height: 54,

              borderRadius: 2,

              background:
                "linear-gradient(135deg,#4F46E5,#2563EB)",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              color: "#FFFFFF",

              fontWeight: 700,

              fontSize: 20

            }}
          >

            KC

          </Box>

        </Box>

        <Typography
          align="center"
          sx={{

            color: "#FFFFFF",

            fontWeight: 700,

            fontSize: 24,

            lineHeight: 1.2

          }}
        >

          KnowledgeCulture

        </Typography>

        <Typography
          align="center"
          sx={{

            color: "#94A3B8",

            fontSize: 13,

            mt: .75,

            mb: 3

          }}
        >

          Learning Management System

        </Typography>

        {children}

      </KCCard>

    </Box>

  );

};

export default AuthLayout;