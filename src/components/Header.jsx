import logoImg from "../assets/quiz-logo.png";

export default function Header({ appName }) {
  return (
    <header className="grid grid-rows-2 place-items-center justify-center gap-2 p-4">
      <img className="h-20" src={logoImg} alt="app-logo" />
      <h1 className="text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 font-bold uppercase tracking-[.25em] gradie">
        {appName}
      </h1>
    </header>
  );
}
