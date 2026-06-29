import Chip from "@mui/material/Chip";

import Colors from "../../theme/colors";

interface KCStatusChipProps {

  status: string;

}

const KCStatusChip = ({
  status
}: KCStatusChipProps) => {

  const getColor = () => {

    switch (status.toLowerCase()) {

      case "published":

        return {

          background: "#DCFCE7",

          color: "#166534"

        };

      case "draft":

        return {

          background: "#FEF3C7",

          color: "#92400E"

        };

      case "archived":

        return {

          background: "#FEE2E2",

          color: "#991B1B"

        };

      default:

        return {

          background: Colors.surfaceLight,

          color: Colors.textPrimary

        };

    }

  };

  const colors = getColor();

  return (

    <Chip

      label={status}

      size="small"

      sx={{

        backgroundColor: colors.background,

        color: colors.color,

        fontWeight: 700,

        minWidth: 90,

        borderRadius: 2

      }}

    />

  );

};

export default KCStatusChip;