import { useCallback, useState } from "react";
import questions from "../assets/questions.json";
import { QuizContext } from "../contexts/quiz-context";

export default function QuizProvider({ children }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQuestion = questions[currentQuestionIdx];

  const onNextQuestion = useCallback(() => {
    if (currentQuestionIdx >= questions.length - 1) return;
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  }, [currentQuestionIdx]);

  const onRestart = useCallback(() => {
    setCurrentQuestionIdx(0);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        currentQuestion: currentQuestion,
        questions: questions,
        currentQuestionIdx: currentQuestionIdx,
        nextQuestion: onNextQuestion,
        restart: onRestart
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
