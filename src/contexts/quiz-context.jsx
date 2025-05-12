import { createContext } from "react";

export const QuizContext = createContext({
  currentQuestion: {
    id: 1,
    text: "",
    options: [""],
    correctAnswer: "",
  },
  questions: [
    {
      id: 1,
      text: "",
      options: [""],
      correctAnswer: "",
    },
  ],
  currentQuestionIdx: 0,
  nextQuestion: () => {},
  restart: () => {},
});
