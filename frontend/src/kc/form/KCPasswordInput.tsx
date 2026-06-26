import { useState } from "react";

import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

import {
  IconButton
} from "@mui/material";

import KCInput from "./KCInput";

import type {
  KCInputProps
} from "./KCInput";

const KCPasswordInput = (
  props: KCInputProps
) => {

  const [

    showPassword,

    setShowPassword

  ] = useState(false);

  return (

    <KCInput

      {...props}

      type={
        showPassword
          ? "text"
          : "password"
      }

      endIcon={

        <IconButton

          onClick={() =>

            setShowPassword(

              previous => !previous

            )

          }

          edge="end"

        >

          {

            showPassword

              ?

              <VisibilityOff />

              :

              <Visibility />

          }

        </IconButton>

      }

    />

  );

};

export default KCPasswordInput;