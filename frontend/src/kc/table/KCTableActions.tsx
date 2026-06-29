import {
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";

import MoreVertRoundedIcon
  from "@mui/icons-material/MoreVertRounded";

import EditRoundedIcon
  from "@mui/icons-material/EditRounded";

import DeleteRoundedIcon
  from "@mui/icons-material/DeleteRounded";

import PublishRoundedIcon
  from "@mui/icons-material/PublishRounded";

import { useState } from "react";

interface Props {

  onEdit?: () => void;

  onPublish?: () => void;

  onDelete?: () => void;

}

const KCTableActions = ({
  onEdit,
  onPublish,
  onDelete
}: Props) => {

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  return (

    <>

      <IconButton
        onClick={(e) =>
          setAnchorEl(e.currentTarget)
        }
      >

        <MoreVertRoundedIcon />

      </IconButton>

      <Menu

        anchorEl={anchorEl}

        open={Boolean(anchorEl)}

        onClose={() => setAnchorEl(null)}

      >

        <MenuItem
          onClick={onEdit}
        >

          <EditRoundedIcon
            sx={{ mr: 1 }}
          />

          Edit

        </MenuItem>

        <MenuItem
          onClick={onPublish}
        >

          <PublishRoundedIcon
            sx={{ mr: 1 }}
          />

          Publish

        </MenuItem>

        <MenuItem
          onClick={onDelete}
        >

          <DeleteRoundedIcon
            sx={{ mr: 1 }}
          />

          Delete

        </MenuItem>

      </Menu>

    </>

  );

};

export default KCTableActions;