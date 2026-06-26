import {
  TextField,
  InputAdornment,
  type TextFieldProps
} from "@mui/material";

import type { ReactNode } from "react";

import Colors from "../../theme/colors";
import Radius from "../../theme/radius";

export type KCInputProps = {

  label?: string;

  placeholder?: string;

  value?: string;

  onChange?: TextFieldProps["onChange"];

  type?: string;

  error?: boolean;

  helperText?: ReactNode;

  required?: boolean;

  disabled?: boolean;

  multiline?: boolean;

  rows?: number;

  fullWidth?: boolean;

  startIcon?: ReactNode;

  endIcon?: ReactNode;

};

const KCInput = ({

  startIcon,

  endIcon,

  fullWidth = true,

  ...props

}: KCInputProps) => {

  return (

    <TextField

      {...props}

      fullWidth={fullWidth}

      size="small"

      variant="outlined"

      slotProps={{

        input: {

          startAdornment: startIcon ? (

            <InputAdornment position="start">

              {startIcon}

            </InputAdornment>

          ) : undefined,

          endAdornment: endIcon ? (

            <InputAdornment position="end">

              {endIcon}

            </InputAdornment>

          ) : undefined

        }

      }}

      sx={{

        "& .MuiOutlinedInput-root": {

          minHeight: 46,

          borderRadius: Radius.md,

          background: Colors.surface,

          color: Colors.textPrimary,

          "& fieldset": {

            borderColor: Colors.border

          },

          "&:hover fieldset": {

            borderColor: Colors.primary

          },

          "&.Mui-focused fieldset": {

            borderColor: Colors.secondary,

            borderWidth: 2

          }

        },

        "& .MuiInputBase-input": {

          color: Colors.textPrimary

        },

        "& .MuiInputLabel-root": {

          color: Colors.textSecondary

        }

      }}

    />

  );

};

export default KCInput;