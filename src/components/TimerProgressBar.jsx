import { useEffect, useImperativeHandle, useRef, useState } from "react";

export default function TimerProgressBar({
  ref,
  maxTime,
  onTimeUp,
  resetTrigger,
}) {
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const intervalRef = useRef(null);

  const timePercent = (timeLeft / maxTime) * 100 + "%";

  useImperativeHandle(
    ref,
    () => {
      return {
        stopTimer() {
          clearInterval(intervalRef.current);
        },
      };
    },
    []
  );

  useEffect(() => {
    const timeout = setTimeout(onTimeUp, maxTime);
    return () => clearTimeout(timeout);
  }, [onTimeUp, maxTime, resetTrigger]);

  useEffect(() => {
    const intervalTick = 10;

    setTimeLeft(maxTime);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev == 0) {
          clearInterval(intervalRef.current);
          return prev;
        }
        const newTime = prev - intervalTick;
        return newTime;
      });
    }, intervalTick);

    return () => clearInterval(intervalRef.current);
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
