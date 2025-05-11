import { useCallback, useContext } from "react";
import { QuizContext } from "../contexts/quiz-context";
import TimerProgressBar from "./TimerProgressBar";

export default function QuizAnswer() {
  const { currentQuestion, nextQuestion } = useContext(QuizContext);

  const onTimeUp = useCallback(() => {
    console.log("Time is up!");
  }, []);

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

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center justify-center bg-gradient-to-r from-fuchsia-700 border-2 border-fuchsia-600 rounded-3xl lg:w-2xl p-4">
          <h2 className="text-2xl font-bold tracking-wider mb-4">
            {currentQuestion.text}
          </h2>

          <TimerProgressBar
            maxTime={10000}
            onTimeUp={onTimeUp}
            resetTrigger={currentQuestion}
          ></TimerProgressBar>

          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              className="cursor-pointer bg-gradient-to-r from-fuchsia-700 hover:to-sky-600 border-1 border-fuchsia-600 font-bold rounded-full w-full p-2"
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          className="flex gap-2 self-end cursor-pointer bg-gradient-to-r to-sky-400 hover:to-sky-500 border-2 border-sky-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={nextQuestion}
        >
          Next question {rightArrow}
        </button>
      </section>
    </>
  );
}
