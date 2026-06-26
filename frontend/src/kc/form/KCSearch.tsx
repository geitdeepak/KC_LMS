import SearchRoundedIcon
  from "@mui/icons-material/SearchRounded";

import KCInput from "./KCInput";

import type {
  KCInputProps
} from "./KCInput";

const KCSearch = (
  props: KCInputProps
) => {

  return (

    <KCInput

      {...props}

      placeholder="Search..."

      startIcon={

        <SearchRoundedIcon />

      }

    />

  );

};

export default KCSearch;