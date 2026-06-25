export interface QuizDto {
  id: string;
  lessonId: string;
  title: string;
  passingScore: number;
  isPublished: boolean;
}

export interface QuizQuestionDto {
  id: string;
  quizId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  marks: number;
}

export interface QuizResultDto {
  score: number;
  totalMarks: number;
  isPassed: boolean;
}

export interface SubmitQuizAnswer {
  questionId: string;
  selectedAnswer: string;
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: SubmitQuizAnswer[];
}

export interface QuizStatusDto {
  quizId: string;
  isPassed: boolean;
}