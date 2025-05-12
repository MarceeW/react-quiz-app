import Header from "./components/Header.jsx";
import QuizContent from "./components/QuizContent.jsx";
import QuizProvider from "./components/QuizProvider.jsx";

export default function App() {
  return (
    <>
      <div className="select-none mb-10 mt-10">
        <Header appName="React Quiz App" />
      </div>
      <div className="select-none flex justify-center m-4 pb-10">
        <QuizProvider>
          <QuizContent></QuizContent>
        </QuizProvider>
      </div>
    </>
  );
}
