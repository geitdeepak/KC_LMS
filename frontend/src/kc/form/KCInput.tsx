import {
  TextField,
  type TextFieldProps
} from "@mui/material";

const KCInput = (
  props: TextFieldProps
) => {

  return (

    <TextField

      {...props}

      fullWidth

      size="small"

      variant="outlined"

      sx={{

        "& .MuiOutlinedInput-root": {

          height: 46,

          borderRadius: "12px",

          backgroundColor: "#111827",

          color: "#F8FAFC",

          transition: ".25s",

          "& fieldset": {

            borderColor: "#374151"

          },

          "&:hover fieldset": {

            borderColor: "#4F46E5"

          },

          "&.Mui-focused fieldset": {

            borderColor: "#6366F1",

            borderWidth: "2px"

          }

        },

        "& .MuiInputBase-input": {

          color: "#F8FAFC",

          fontSize: 15,

          fontWeight: 500

        },

        "& .MuiInputLabel-root": {

          color: "#94A3B8",

          fontSize: 14

        },

        "& .MuiInputLabel-root.Mui-focused": {

          color: "#818CF8"

        },

        ...props.sx

      }}

    />

  );

};

export default KCInput;