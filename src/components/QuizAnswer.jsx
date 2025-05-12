import {
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { QuizContext } from "../contexts/quiz-context";
import TimerProgressBar from "./TimerProgressBar";

const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

export default function QuizAnswer({ onFinish, className, ref }) {
  const { currentQuestion, currentQuestionIdx, nextQuestion, questions } =
    useContext(QuizContext);

  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const progressRef = useRef(null);
  const answersRef = useRef([]);

  const isLastQuestion = currentQuestionIdx === questions.length - 1;

  const onTimeUp = useCallback(() => {
    setOptionsDisabled(true);
    answersRef.current = [...answersRef.current, null];
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        reset() {
          setOptionsDisabled(false);
          answersRef.current = [];
        },
      };
    },
    []
  );

  function handleOptionCLick(answer) {
    if (optionsDisabled) return;

    setOptionsDisabled(true);

    if (answer == currentQuestion.correctAnswer) {
      setCorrectAnswerCount((prev) => prev + 1);
    }

    progressRef.current.stopTimer();
    answersRef.current = [...answersRef.current, answer];
  }

  function handleNextQuestion() {
    if (isLastQuestion) {
      onFinish(answersRef.current);
      return;
    }

    setOptionsDisabled(false);
    nextQuestion();
  }

  return (
    <>
      <section className={`flex flex-col gap-4 ${className}`}>
        <div className="flex flex-col gap-4 items-center justify-center bg-gradient-to-r from-fuchsia-700 border-2 border-fuchsia-600 rounded-3xl shadow-md p-4">
          <h2 className="text-2xl font-bold tracking-wider mb-4">
            {currentQuestion.text}
          </h2>

          <TimerProgressBar
            ref={progressRef}
            maxTime={10000}
            onTimeUp={onTimeUp}
            resetTrigger={currentQuestion}
          ></TimerProgressBar>

          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              className={` ${
                opt == currentQuestion.correctAnswer
                  ? "disabled:from-emerald-300 disabled:to-emerald-600"
                  : "disabled:from-rose-500 disabled:to-rose-700"
              } cursor-pointer bg-gradient-to-r from-fuchsia-900 hover:to-sky-600 border-1 disabled:cursor-default border-fuchsia-600 font-bold rounded-full w-full p-2`}
              disabled={optionsDisabled}
              onClick={() => handleOptionCLick(opt)}
            >
              {opt}
            </button>
          ))}
          <div>
            Question {currentQuestionIdx + 1} of {questions.length}
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            Correct answers:{" "}
            <span className="text-emerald-400 font-extrabold">
              {correctAnswerCount}
            </span>
          </div>

          <button
            className="flex gap-2 self-end cursor-pointer bg-gradient-to-r to-sky-400 hover:to-sky-500 border-2 border-sky-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleNextQuestion}
          >
            {isLastQuestion ? <>Finish</> : <>Next question {rightArrow}</>}
          </button>
        </div>
      </section>
    </>
  );
}
