import React, { useEffect, useState } from "react";

const FULL_TEXT =
  "There is a mini info about the Website. The (BMI) is a Exhibition Website.";

export default function TopHeader() {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId;

    const typeNextChar = () => {
      if (index <= FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, index));
        index += 1;
        // slight randomness in speed feels more natural / less robotic
        const delay = 28 + Math.random() * 35;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsDone(true);
      }
    };

    // small delay before typing starts
    timeoutId = setTimeout(typeNextChar, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full bg-white px-4 py-2">
      <p className="text-center font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-snug text-[#1A1A1A]">
        <span>{displayedText}</span>
        <span
          className={`ml-0.5 inline-block w-0.5 sm:w-0.75 h-[1em] align-middle bg-[#F5821F] ${
            isDone ? "animate-blink" : "opacity-100"
          }`}
        />
      </p>

      <style>{`
        @keyframes blink {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-blink {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
