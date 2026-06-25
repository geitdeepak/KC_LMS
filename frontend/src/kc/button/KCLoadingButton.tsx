import {
  CircularProgress
} from "@mui/material";

import KCButton
  from "./KCButton";

import type {
  KCButtonProps
} from "./KCButton";

interface KCLoadingButtonProps
  extends KCButtonProps {

  loading?: boolean;

}

const KCLoadingButton = ({
  loading = false,
  children,
  ...props
}: KCLoadingButtonProps) => {

  return (

    <KCButton
      {...props}
      disabled={
        loading ||
        props.disabled
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

          children

      }

    </KCButton>

  );

};

export default KCLoadingButton;