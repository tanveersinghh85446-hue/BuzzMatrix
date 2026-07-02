import React, { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function IntroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#1A1A1A] py-28 px-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#F5821F]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#F5821F]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span
          className={`inline-block text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase transition-all duration-700 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          About Buzz Matrix India
        </span>
        <h1
          className={`mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight transition-all duration-700 ease-out delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Where Ideas Take{" "}
          <span className="text-[#F5821F]">Physical Shape</span>
        </h1>
        <p
          className={`mt-6 text-base sm:text-lg text-[#B5B5B5] max-w-2xl mx-auto transition-all duration-700 ease-out delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          We are a team of designers, fabricators, and event specialists turning
          briefs into stalls, stages, and interiors that get noticed.
        </p>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#F0F0F0]">
            <img
              src=""
              alt="BMI team at work"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            Our Story
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] leading-tight">
            Built On Deadlines Met And Brands Remembered
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#6E6E6E] leading-relaxed">
            Buzz Matrix India started with a simple belief — an exhibition stall
            is the first handshake between a brand and its audience, and it
            deserves to be designed like one. What began as a small fabrication
            unit in Delhi has grown into a full-service exhibition, event, and
            interior partner trusted by brands across India.
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#6E6E6E] leading-relaxed">
            Today, our in-house design and production teams handle every stage
            of a project — from the first 3D concept to the final dismantle — so
            our clients never have to coordinate between multiple vendors.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-3xl font-black text-[#F5821F]">12+</p>
              <p className="text-xs text-[#6E6E6E] uppercase tracking-wide">
                Years in Business
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#F5821F]">450+</p>
              <p className="text-xs text-[#6E6E6E] uppercase tracking-wide">
                Projects Delivered
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  const items = [
    {
      label: "Our Mission",
      text: "To help every brand we work with make a strong, memorable impression through thoughtful design and flawless execution — on time, every time.",
    },
    {
      label: "Our Vision",
      text: "To be India's most trusted exhibition, event, and interior partner, known equally for creative ambition and dependable delivery.",
    },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-24 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 150}>
            <div className="h-full rounded-2xl bg-white border border-[#6E6E6E]/15 p-8 sm:p-10">
              <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
                {item.label}
              </span>
              <p className="mt-4 text-lg sm:text-xl text-[#1A1A1A] font-medium leading-relaxed">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const VALUES = [
  {
    title: "Creativity First",
    desc: "Every project starts with a design idea worth remembering, not a template.",
  },
  {
    title: "Reliability",
    desc: "Deadlines are commitments. We plan backwards from your event date, always.",
  },
  {
    title: "Craftsmanship",
    desc: "In-house fabrication means quality control at every single stage.",
  },
  {
    title: "Transparency",
    desc: "Clear timelines, clear costs, clear communication — no surprises.",
  },
];

function CoreValues() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            What Drives Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            Our Core Values
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-[#6E6E6E]/15 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5821F]/40 hover:shadow-xl">
                <div className="mb-4 h-1 w-10 rounded-full bg-[#F5821F] transition-all duration-300 group-hover:w-16" />
                <h3 className="mb-2 text-lg font-bold text-[#1A1A1A]">
                  {v.title}
                </h3>
                <p className="text-sm text-[#6E6E6E] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCountUp(target, active, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime = null;
    let raf;
    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

const STATS = [
  { label: "Years of Experience", value: 12, suffix: "+" },
  { label: "Successful Projects", value: 450, suffix: "+" },
  { label: "Happy Clients", value: 300, suffix: "+" },
  { label: "Cities Covered", value: 20, suffix: "+" },
];

function Stats() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="w-full bg-[#F5821F] py-16 px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {STATS.map((stat) => {
          const count = useCountUp(stat.value, visible);
          return (
            <div key={stat.label}>
              <p className="text-4xl sm:text-5xl font-black text-white">
                {count}
                {stat.suffix}
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-white/85 uppercase">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Founder & Creative Director", role: "Design Leadership" },
  { name: "Head of Fabrication", role: "Production" },
  { name: "Client Servicing Lead", role: "Project Management" },
  { name: "Site & Installation Head", role: "Execution" },
];

function Team() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            The People Behind BMI
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            Meet Our Team
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <div className="text-center">
                <div className="mx-auto mb-4 aspect-square w-full max-w-45 overflow-hidden rounded-2xl bg-[#EDEDED]">
                  <img
                    src="/"
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition duration-300 hover:grayscale-0"
                  />
                </div>
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  {member.name}
                </h3>
                <p className="text-xs text-[#F5821F] uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1A1A] py-20 px-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F5821F]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#F5821F]/10 blur-3xl" />

      <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Let's Build Something Brands Remember
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#B5B5B5]">
          Tell us about your next exhibition, event, or interior project.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block rounded-md bg-[#F5821F] px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1A1A1A]"
        >
          Get In Touch
        </a>
      </Reveal>
    </section>
  );
}

export default function About() {
  return (
    <main className="w-full overflow-x-hidden">
      <IntroBanner />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <Stats />
      <Team />
      <CTA />
    </main>
  );
}
