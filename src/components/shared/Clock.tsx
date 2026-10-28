"use client";

import { CSSProperties, useEffect, useState } from "react";
import "@/assets/Clock.css";

type ClockProps = {
  ContainerClassName?: string;
  svgClassName?: string;
  dTimeClassName?: string;
  clockSize?: string;
  showDTime?: boolean;
  showFocus?: boolean;
};
type HandAngles = {
  hour: number;
  minute: number;
  second: number;
};
const Forward = (prev: number, next: number) => {
  const delta = (((next - prev) % 360) + 360) % 360;
  return prev + delta;
};

const Clock = ({
  ContainerClassName = "w-[200] h-[200]",
  svgClassName = "",
  dTimeClassName = "",
  clockSize = "80%",
  showDTime = true,
  showFocus = true,
}: ClockProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [showDTime_, setShowDTime_] = useState<boolean>(showDTime);
  const [angles, setAngles] = useState<HandAngles>({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());

  const FocusMode = () => {
    const el = document.querySelector("#clock-container");
    if (!el) return false;
    if (!focus) {
      el.classList.add("focused");
      setFocus(true);
    } else {
      el.classList.remove("focused");
      setFocus(false);
    }
    setShowDTime_(focus);
  };
  const TimeToggle = () => {
    setShowDTime_((prev: boolean) => !prev);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const date = new Date();
      setTime(date);
      const seconds = date.getSeconds();
      const minutes = date.getMinutes();
      const hours = date.getHours() % 12;

      setAngles((prev: HandAngles) => ({
        second: Forward(prev.second, seconds * 6),
        minute: Forward(prev.minute, minutes * 6),
        hour: Forward(prev.hour, hours * 30),
      }));
      setIsLoaded(true);
      timeoutId = setTimeout(tick, 1000 - date.getMilliseconds());
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  const handStyle = (deg: number): CSSProperties => ({
    transform: `rotate(${deg}deg)`,
    transformOrigin: "50px 50px",
    transformBox: "view-box",
    transition: "transform 50ms cubic-bezier(.07,.2,.26,.92)",
  });

  return (
    <div
      id="clock-container"
      className={`relative flex flex-col justify-center items-center ${ContainerClassName}`}
    >
      <svg
        viewBox="0 0 100 100"
        width={clockSize}
        height={clockSize}
        className={svgClassName}
        role="img"
        onDoubleClick={() => TimeToggle()}
      >
        <circle
          cx={50}
          cy={50}
          r={48}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        ></circle>
        {Array.from({ length: 60 }, (_, i) => {
          const isHour = i % 5 === 0;
          return (
            <line
              key={i}
              x1={50}
              y1={5}
              x2={50}
              y2={isHour ? 12 : 8}
              stroke="currentColor"
              strokeWidth={isHour ? 1.6 : 0.75}
              opacity={isHour ? 1 : 0.5}
              transform={`rotate(${i * 6} 50 50)`}
            />
          );
        })}
        {isLoaded && (
          <g>
            <line
              x1={50}
              y1={18}
              x2={50}
              y2={50}
              stroke="currentColor"
              strokeWidth={1.6}
              style={handStyle(angles.hour)}
            ></line>
            <line
              x1={50}
              y1={13}
              x2={50}
              y2={50}
              stroke="currentColor"
              strokeWidth={1.2}
              style={handStyle(angles.minute)}
            ></line>
            <line
              x1={50}
              y1={8}
              x2={50}
              y2={50}
              stroke="red"
              strokeWidth={0.75}
              style={handStyle(angles.second)}
            ></line>
            <line
              x1={50}
              y1={43}
              x2={50}
              y2={50}
              stroke="red"
              strokeWidth={0.75}
              style={handStyle(angles.second + 180)}
            ></line>
          </g>
        )}
        <circle
          cx={50}
          cy={50}
          r={2}
          stroke="currentColor"
          fill="currentColor"
        ></circle>
      </svg>
      {showDTime_ && (
        <div className={`text-center w-full mt-4 select-none${dTimeClassName}`}>
          {time.toLocaleTimeString()}
        </div>
      )}
      {showFocus && (
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => FocusMode()}
        >
          <svg
            viewBox="0 0 24 24"
            width="27"
            height="27"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M15.6 4.3 A8.5 8.5 0 1 0 19.7 8.4" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Clock;
