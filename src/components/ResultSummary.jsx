import { useContext } from "react";
import { QuizContext } from "../contexts/quiz-context";

export default function ResultSummary({ className, answers, onRestart }) {
  const { questions } = useContext(QuizContext);

  const correctAnswerRate =
    answers.reduce((prev, curr, idx) => {
      return prev + (curr == questions[idx].correctAnswer ? 1 : 0);
    }, 0) / questions.length;

  const resultColor =
    correctAnswerRate >= 0.8
      ? "text-emerald-400"
      : correctAnswerRate >= 0.4
      ? "text-orange-400"
      : "text-rose-500";

  return (
    <section id="quiz-summary" className={`flex flex-col gap-2 ${className}`}>
      <div className="w-full flex flex-col justify-center gap-4 border-2 bg-gradient-to-b from-fuchsia-700 border-fuchsia-500 rounded-3xl p-4">
        <h1 className="text-3xl text-center font-bold tracking-[.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-300">
          Quiz Summary
        </h1>
        <div
          className={`font-bold text-2xl font-mono text-center ${resultColor}`}
        >
          {correctAnswerRate * 100}%
        </div>
        {questions.map((question, idx) => (
          <div key={idx} className="w-full border-t-1 border-fuchsia-600 p-2">
            <h4 className="text-xl">
              {idx + 1}. {question.text}
            </h4>
            <span>
              Your answer was:{" "}
              <span
                className={`${
                  answers[idx] == question.correctAnswer
                    ? "text-emerald-400"
                    : "text-rose-500"
                } font-bold`}
              >
                {answers[idx] ? answers[idx] : "No answer."}
              </span>
              {answers[idx] == question.correctAnswer ? (
                <span>&nbsp;&#x2714;</span>
              ) : (
                <div>
                  The correct answer was:{" "}
                  <span className="text-emerald-400 font-bold">
                    {question.correctAnswer}
                  </span>
                </div>
              )}
            </span>
          </div>
        ))}
      </div>
      <button onClick={onRestart} className="self-center w-full cursor-pointer bg-gradient-to-r to-sky-400 hover:to-sky-500 border-2 border-sky-600 text-white font-bold py-2 px-4 rounded-full">
        Restart Quiz
      </button>
    </section>
  );
}
