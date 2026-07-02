import React from "react";

const LOGOS = [
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
  { src: "", alt: "Brand Logo" },
];

export default function Header() {
  return (
    <section className="w-full bg-white py-10 overflow-hidden">
      <p className="mb-6 text-center text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#6E6E6E] uppercase">
        Trusted by Brands We've Worked With
      </p>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-linear-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="mx-6 sm:mx-10 flex h-14 sm:h-20 w-28 sm:w-36 shrink-0 items-center justify-center  transition duration-300"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
