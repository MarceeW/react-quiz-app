import { useEffect, useState } from "react";

export default function TimerProgressBar({ maxTime, onTimeUp, resetTrigger }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  const timePercent = (timeLeft / maxTime) * 100 + "%";

  useEffect(() => {
    const intervalTick = 10;

    setTimeLeft(maxTime);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - intervalTick;
        if (newTime <= 0) {
          clearInterval(interval);
          onTimeUp();
        }
        return newTime;
      });
    }, intervalTick);

    return () => clearInterval(interval);
  }, [maxTime, onTimeUp, resetTrigger]);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-purple-400 rounded-full h-2.5 mb-4">
      <div
        className="h-2.5 bg-sky-400 rounded-full "
        style={{ width: timePercent }}
      ></div>
    </div>
  );
}
