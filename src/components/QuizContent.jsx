import QuizAnswer from "./QuizAnswer";
import { QuizContext } from "../contexts/quiz-context";
import ResultSummary from "./ResultSummary";
import { useContext } from "react";

export default function QuizContent() {
  const { questions, currentQuestionIdx } = useContext(QuizContext);

  const isFinished = questions.length - 1 === currentQuestionIdx;

  return (
    <>
      {!isFinished && <QuizAnswer></QuizAnswer>}
      {isFinished && <ResultSummary></ResultSummary>}
    </>
  );
}
