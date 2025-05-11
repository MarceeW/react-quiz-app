import { createContext } from "react";

export const QuizContext = createContext({
  currentQuestion: {
    id: 1,
    text: "",
    options: [""],
    correctAnswer: "",
  },
  questions: [],
  currentQuestionIdx: 0,
  nextQuestion: () => {},
});
