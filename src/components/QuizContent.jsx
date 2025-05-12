import { useCallback, useContext, useRef, useState } from "react";
import QuizAnswer from "./QuizAnswer";
import ResultSummary from "./ResultSummary";
import { QuizContext } from "../contexts/quiz-context";

export default function QuizContent() {
  const { restart } = useContext(QuizContext);
  const [finished, setFinished] = useState(false);
  const answerComponentRef = useRef();
  const answersRef = useRef([]);

  const onFinish = useCallback((answers) => {
    setFinished(true);
    answerComponentRef.current.reset();
    answersRef.current = answers;
  }, []);

  const onRestart = useCallback(() => {
    console.log(answerComponentRef);
    setFinished(false);
    restart();
  }, [restart]);

  return (
    <>
      {!finished && (
        <QuizAnswer
          ref={answerComponentRef}
          className="lg:w-2xl"
          onFinish={onFinish}
        ></QuizAnswer>
      )}
      {finished && (
        <ResultSummary
          answers={answersRef.current}
          onRestart={onRestart}
          className="lg:w-2xl"
        ></ResultSummary>
      )}
    </>
  );
}
