import { useState } from "react";
import questions from "../assets/questions.json";
import { QuizContext } from "../contexts/quiz-context";

export default function QuizProvider({ children }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQuestion = questions[currentQuestionIdx];

  function onNextQuestion() {
    if (currentQuestionIdx >= questions.length - 1) return;
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  }

  return (
    <QuizContext.Provider
      value={{
        currentQuestion: currentQuestion,
        nextQuestion: onNextQuestion,
        questions: questions,
        currentQuestionIdx: currentQuestionIdx,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
