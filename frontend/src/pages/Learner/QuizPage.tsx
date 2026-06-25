import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  getQuizQuestions,
  submitQuiz,
  getQuizStatus
} from "../../services/courseService";

import type {
  QuizQuestionDto,
  QuizResultDto
} from "../../types/quiz";

const QuizPage = () => {
  const { quizId } = useParams();

  const [questions, setQuestions] =
    useState<QuizQuestionDto[]>([]);

  const [answers, setAnswers] =
    useState<Record<string, string>>(
      {}
    );

  const [loading, setLoading] =
    useState(true);

  const [result, setResult] =
    useState<QuizResultDto | null>(
      null
    );

  const [quizPassed, setQuizPassed] =
    useState(false);

  useEffect(() => {
    const loadQuestions =
      async () => {
        try {
          const data =
            await getQuizQuestions(
              quizId!
            );

          setQuestions(data);

          const status =
            await getQuizStatus(
              quizId!
            );

          setQuizPassed(
            status.isPassed
          );
        }
        catch (error) {
          console.error(error);
        }
        finally {
          setLoading(false);
        }
      };

    loadQuestions();
  }, [quizId]);

  const handleAnswerChange = (
    questionId: string,
    answer: string
  ) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz =
    async () => {
      try {
        const payload = {
          quizId: quizId!,
          answers:
            Object.entries(
              answers
            ).map(
              ([
                questionId,
                selectedAnswer
              ]) => ({
                questionId,
                selectedAnswer
              })
            )
        };

        const quizResult =
          await submitQuiz(
            payload
          );

        setResult(
          quizResult
        );

        if (
          quizResult.isPassed
        ) {
          setQuizPassed(
            true
          );
        }
      }
      catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <Container
        sx={{
          mt: 8,
          textAlign: "center"
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4 }}
    >
      <Typography
        variant="h3"
        gutterBottom
      >
        Quiz
      </Typography>

      {questions.map(
        (
          question,
          index
        ) => (
          <Paper
            key={question.id}
            sx={{
              p: 3,
              mb: 3
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              {index + 1}.{" "}
              {question.question}
            </Typography>

            <RadioGroup
              value={
                answers[
                  question.id
                ] || ""
              }
              onChange={e =>
                handleAnswerChange(
                  question.id,
                  e.target.value
                )
              }
            >
              <FormControlLabel
                value={
                  question.optionA
                }
                control={<Radio />}
                label={
                  question.optionA
                }
              />

              <FormControlLabel
                value={
                  question.optionB
                }
                control={<Radio />}
                label={
                  question.optionB
                }
              />

              <FormControlLabel
                value={
                  question.optionC
                }
                control={<Radio />}
                label={
                  question.optionC
                }
              />

              <FormControlLabel
                value={
                  question.optionD
                }
                control={<Radio />}
                label={
                  question.optionD
                }
              />
            </RadioGroup>
          </Paper>
        )
      )}

      <Button
        variant="contained"
        size="large"
        disabled={quizPassed}
        onClick={
          handleSubmitQuiz
        }
      >
        {quizPassed
          ? "Quiz Passed"
          : "Submit Quiz"}
      </Button>

      {result && (
        <Alert
          severity={
            result.isPassed
              ? "success"
              : "error"
          }
          sx={{
            mt: 4
          }}
        >
          Score: {result.score}
          {" / "}
          {result.totalMarks}
          <br />
          Status:{" "}
          {result.isPassed
            ? "Passed"
            : "Failed"}
        </Alert>
      )}
    </Container>
  );
};

export default QuizPage;