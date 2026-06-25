import {
  Card,
  CardContent,
  LinearProgress,
  Typography
} from "@mui/material";

interface Props {

  progress: number;

}

const LearningProgressCard = ({
  progress
}: Props) => {

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

            mb: 1

          }}
        >

          Learning Progress

        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 3
          }}
        >

          Keep learning.
          You're doing great.

        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{

            height: 12,

            borderRadius: 10

          }}
        />

        <Typography
          sx={{

            mt: 2,

            fontWeight: 700

          }}
        >

          {progress}% Completed

        </Typography>

      </CardContent>

    </Card>

  );

};

export default LearningProgressCard;