import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";

const RecentActivityCard = () => {

  return (

    <Card
      sx={{

        mt: 4,

        borderRadius: 3

      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          sx={{

            fontWeight: 700,

            mb: 2

          }}
        >

          Recent Activity

        </Typography>

        <List disablePadding>

          <ListItem>

            <ListItemText

              primary="Azure Administrator course resumed"

              secondary="2 hours ago"

            />

          </ListItem>

          <Divider />

          <ListItem>

            <ListItemText

              primary="Quiz completed successfully"

              secondary="Yesterday"

            />

          </ListItem>

          <Divider />

          <ListItem>

            <ListItemText

              primary="Certificate downloaded"

              secondary="Last week"

            />

          </ListItem>

        </List>

      </CardContent>

    </Card>

  );

};

export default RecentActivityCard;