import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Stack,
  Typography
} from "@mui/material";

import {
  useContext,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import KCInput
  from "../../kc/form/KCInput";

import KCButton
  from "../../kc/button/KCButton";

import {
  login as loginService
} from "../../services/authService";

import {
  AuthContext
} from "../../auth/AuthContext";

const LoginForm = () => {

  const navigate =
    useNavigate();

  const auth =
    useContext(
      AuthContext
    );

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const handleLogin =
    async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await loginService({

            email,

            password

          });

        console.log(response);
        console.log(response.user);
        console.log(response.user.role);

        auth?.login(

          response.accessToken,

          response.user

        );

        switch (
          response.user.role
        ) {

          case "Admin":

            navigate(
              "/admin/dashboard"
            );

            break;

          case "Instructor":

            navigate(
              "/instructor/dashboard"
            );

            break;

          default:

            navigate(
              "/learner/dashboard"
            );

            break;

        }

      }

      catch (err: any) {

        setError(

          err?.response?.data?.message ??

          "Invalid email or password."

        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <Stack
      spacing={2.5}
    >

      <Box>

        <Typography
          sx={{

            color: "#FFFFFF",

            fontWeight: 700,

            fontSize: 32

          }}
        >

          Welcome Back

        </Typography>

        <Typography
          sx={{

            color: "#94A3B8",

            mt: .5,

            fontSize: 15

          }}
        >

          Sign in to continue learning

        </Typography>

      </Box>

      {

        error && (

          <Alert
            severity="error"
          >

            {error}

          </Alert>

        )

      }

      <KCInput

        label="Email Address"

        value={email}

        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }

      />

      <KCInput

        label="Password"

        type="password"

        value={password}

        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }

      />

      <Box
        sx={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center"

        }}
      >

        <FormControlLabel

          sx={{

            m: 0,

            "& .MuiTypography-root": {

              color: "#CBD5E1",

              fontSize: 14

            }

          }}

          control={
            <Checkbox
              size="small"
            />
          }

          label="Remember me"

        />

        <Link

          component="button"

          underline="hover"

          sx={{

            fontSize: 14

          }}

          onClick={() =>
            navigate(
              "/forgot-password"
            )
          }

        >

          Forgot Password?

        </Link>

      </Box>

      <KCButton

        disabled={loading}

        onClick={
          handleLogin
        }

      >

        {

          loading

            ?

            <CircularProgress
              size={20}
              color="inherit"
            />

            :

            "Sign In"

        }

      </KCButton>

      <Typography
        align="center"
        sx={{

          color: "#94A3B8",

          fontSize: 14

        }}
      >

        Don't have an account?

      </Typography>

      <Link

        component="button"

        underline="hover"

        sx={{

          fontSize: 15,

          fontWeight: 600,

          textAlign: "center"

        }}

        onClick={() =>
          navigate(
            "/register"
          )
        }

      >

        Create Account

      </Link>

    </Stack>

  );

};

export default LoginForm;