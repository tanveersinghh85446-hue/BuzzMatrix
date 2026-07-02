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

function Reveal({ children, delay = 0, className = "/" }) {
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

/* ========================================================================= */
/* HERO — unchanged, exactly as provided                                     */
/* ========================================================================= */

const IMAGES = ["", "", "", ""];

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/2 h-[140%] w-[60%] -translate-y-1/2 rotate-6 rounded-[45%] bg-linear-to-br from-[#F5821F] to-[#FBB360] opacity-90 animate-ribbon" />
        <div className="absolute -left-10 top-1/2 h-[130%] w-[45%] -translate-y-1/2 rotate-3 rounded-[45%] bg-white" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-10 px-6 py-24 lg:flex-row lg:gap-16 lg:px-12">
        <div className="w-full text-center lg:w-1/2 lg:text-left">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase transition-all duration-700 ease-out ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Exhibition · Event · Interior
          </span>

          <h1
            className={`mt-4 text-4xl font-extrabold leading-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl transition-all duration-700 ease-out delay-150 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            We Design Spaces
            <br />
            That <span className="text-[#F5821F]">Speak</span>
          </h1>

          <p
            className={`mt-6 max-w-md text-base text-[#6E6E6E] mx-auto lg:mx-0 transition-all duration-700 ease-out delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Buzz Matrix India builds exhibition stalls, event experiences, and
            interiors that leave a lasting impression.
          </p>

          {/* <div
            className={`mt-8 flex justify-center gap-4 lg:justify-start transition-all duration-700 ease-out delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button className="rounded-md bg-[#F5821F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#1A1A1A]">
              Get a Quote
            </button>
            <button className="rounded-md border border-[#6E6E6E]/40 px-7 py-3 text-sm font-semibold text-[#1A1A1A] transition hover:border-[#1A1A1A]">
              View Work
            </button>
          </div> */}
        </div>

        <div
          className={`relative w-full overflow-hidden lg:w-1/2 transition-opacity duration-1000 delay-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-105 w-full overflow-hidden rounded-2xl">
            <div className="flex h-full w-[200%] animate-slide">
              {[...IMAGES, ...IMAGES].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="BMI exhibition work"
                  className="h-full w-[25%] shrink-0 object-cover"
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ribbon {
          0%, 100% { transform: translateY(-50%) rotate(6deg); }
          50%      { transform: translateY(-50%) rotate(3deg); }
        }
        .animate-ribbon {
          animation: ribbon 12s ease-in-out infinite;
        }

        @keyframes slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 18s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ribbon, .animate-slide {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ========================================================================= */
/* TRUSTED BRANDS — logo marquee                                             */
/* ========================================================================= */

const CLIENT_LOGOS = Array.from({ length: 8 }, (_, i) => ({
  src: "",
  alt: `Client ${i + 1}`,
}));

function TrustedBrands() {
  return (
    <section className="w-full bg-white py-14 overflow-hidden">
      <Reveal className="mb-8">
        <p className="text-center text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#6E6E6E] uppercase">
          Trusted by Leading Brands
        </p>
      </Reveal>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-linear-to-l from-white to-transparent" />

        <div className="flex w-max animate-marquee">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <div
              key={i}
              className="mx-6 sm:mx-10 flex h-14 sm:h-20 w-28 sm:w-36 shrink-0 items-center justify-center grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
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
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ========================================================================= */
/* WHY CHOOSE US                                                             */
/* ========================================================================= */

const WHY_US = [
  {
    title: "Creative Custom Designs",
    desc: "Every stall is uniquely designed around your brand identity and exhibition goals.",
  },
  {
    title: "Complete Turnkey Solutions",
    desc: "Design, fabrication, printing, installation, dismantling — everything under one roof.",
  },
  {
    title: "3D Design Visualization",
    desc: "See a realistic 3D concept of your stall before execution even begins.",
  },
  {
    title: "Premium Build Quality",
    desc: "High-quality materials and flawless finishing for a premium presence on the floor.",
  },
  {
    title: "Dedicated Project Team",
    desc: "One single point of contact for smooth coordination, start to finish.",
  },
  {
    title: "Pan-India Execution",
    desc: "From Delhi to Mumbai to Bangalore — we deliver anywhere your event takes you.",
  },
];

function WhyUs() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            This Is Why Brands Choose{" "}
            <span className="text-[#F5821F]">BMI</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-[#6E6E6E]/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5821F]/40 hover:shadow-xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5821F]/10 text-lg font-bold text-[#F5821F] transition group-hover:bg-[#F5821F] group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1A1A1A]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6E6E6E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================= */
/* SERVICES                                                                  */
/* ========================================================================= */

const SERVICES = [
  {
    title: "Custom Exhibition Stall Design",
    desc: "3D concepts crafted precisely around your brand identity.",
  },
  {
    title: "Stall Fabrication & Production",
    desc: "Premium-quality fabrication with sharp, precise execution.",
  },
  {
    title: "Modular & Custom Booths",
    desc: "Reusable, flexible, and fully customized booth solutions.",
  },
  {
    title: "Event Design & Production",
    desc: "Stages, branding, lighting and full event experiences.",
  },
  {
    title: "Interior Design & Build",
    desc: "Office, retail, and showroom interiors built to impress.",
  },
  {
    title: "Installation & Dismantling",
    desc: "On-time setup and teardown, anywhere across India.",
  },
];

function Services() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            End-to-End <span className="text-[#F5821F]">Exhibition</span>{" "}
            Solutions
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="relative h-full overflow-hidden rounded-2xl">
                <div className="aspect-4/3 w-full overflow-hidden bg-[#F0F0F0]">
                  <img
                    src="/"
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-[#1A1A1A]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6E6E6E]">{service.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================= */
/* PROCESS                                                                   */
/* ========================================================================= */

const PROCESS = [
  {
    step: "01",
    title: "Brief & Consultation",
    desc: "We understand your brand, budget, and goals for the event.",
  },
  {
    step: "02",
    title: "3D Design & Concept",
    desc: "Our designers turn your brief into a realistic 3D visual.",
  },
  {
    step: "03",
    title: "Fabrication & Build",
    desc: "In-house production ensures quality control at every stage.",
  },
  {
    step: "04",
    title: "Installation & Support",
    desc: "On-ground setup, on-site support, and clean dismantling.",
  },
];

function Process() {
  return (
    <section className="w-full bg-[#1A1A1A] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            Our Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Our Simple 4-Step Process
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 120}>
              <div className="relative">
                <span className="text-5xl font-black text-[#F5821F]/25">
                  {p.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-[#B5B5B5] leading-relaxed">
                  {p.desc}
                </p>
                {i < PROCESS.length - 1 && (
                  <span className="absolute right-6 top-6 hidden text-2xl text-[#F5821F]/40 lg:block">
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================= */
/* PORTFOLIO / FEATURED PROJECTS                                             */
/* ========================================================================= */

const PROJECTS = [
  { name: "Tata Consultancy", meta: "80 Sq. M. · Mumbai Exhibition" },
  { name: "Nexgen Motors", meta: "48 Sq. M. · Chennai Exhibition" },
  { name: "JCB India", meta: "30 Sq. M. · Gujarat Exhibition" },
  { name: "Madhav Engineers", meta: "60 Sq. M. · Bharat Mandapam" },
  { name: "Ambrosia Foods", meta: "18 Sq. M. · Pragati Maidan" },
  { name: "Stonecraft", meta: "100 Sq. M. · Mumbai Exhibition" },
];

function Portfolio() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            Featured Projects
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            Our Recent{" "}
            <span className="text-[#F5821F]">Stalls & Fabrications</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 90}>
              <div className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-4/3 w-full overflow-hidden bg-[#F0F0F0]">
                  <img
                    src=""
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/10 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                  <h3 className="text-base font-bold text-white">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#FBB360]">{project.meta}</p>
                </div>
                {/* always-visible caption for mobile / no-hover devices */}
                <div className="mt-3 sm:hidden">
                  <h3 className="text-base font-bold text-[#1A1A1A]">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#6E6E6E]">{project.meta}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================= */
/* STATS COUNTER                                                             */
/* ========================================================================= */

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

/* ========================================================================= */
/* TESTIMONIALS                                                              */
/* ========================================================================= */

const TESTIMONIALS = [
  {
    quote:
      "BMI turned our exhibition brief into a stall that genuinely stopped visitors in their tracks. Flawless execution.",
    name: "Marketing Head",
    company: "Consumer Electronics Brand",
  },
  {
    quote:
      "From 3D concept to on-ground install, everything was on time and exactly as promised. Our best exhibition yet.",
    name: "Brand Manager",
    company: "Auto Components Firm",
  },
  {
    quote:
      "Their team handled our double-decker stall like pros — great design sense and even better execution speed.",
    name: "Events Lead",
    company: "Manufacturing Company",
  },
];

function Testimonials() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            What Our Clients Say
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="h-full rounded-2xl bg-white p-7 shadow-sm">
                <span className="text-4xl font-black text-[#F5821F]/30">"</span>
                <p className="mt-2 text-sm text-[#3A3A3A] leading-relaxed">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-[#F5821F]/15 overflow-hidden">
                    <img
                      src="/"
                      alt={t.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-xs text-[#6E6E6E]">{t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================= */
/* CTA                                                                       */
/* ========================================================================= */

function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1A1A] py-20 px-6">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F5821F]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#F5821F]/10 blur-3xl" />

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Get a Free 3D Stall Design Consultation
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#B5B5B5]">
          Talk with our exhibition experts and get a customized concept for your
          next event.
        </p>
        <form className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#8A8A8A] outline-none focus:border-[#F5821F]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#8A8A8A] outline-none focus:border-[#F5821F]"
          />
          <input
            type="email"
            placeholder="Professional Email"
            className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#8A8A8A] outline-none focus:border-[#F5821F] sm:col-span-2"
          />
          <button
            type="submit"
            className="rounded-md bg-[#F5821F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1A1A1A] sm:col-span-2"
          >
            Submit
          </button>
        </form>
      </Reveal>
    </section>
  );
}

/* ========================================================================= */
/* FAQ                                                                       */
/* ========================================================================= */

const FAQS = [
  {
    q: "What types of stalls does BMI design?",
    a: "From compact 9 sq.m booths to large double-decker structures, we design and build stalls of every size for exhibitions across India.",
  },
  {
    q: "Do you provide 3D visuals before starting fabrication?",
    a: "Yes, every project starts with a realistic 3D concept so you can approve the design before we begin build work.",
  },
  {
    q: "Which cities do you operate in?",
    a: "We execute projects pan-India — Delhi NCR, Mumbai, Bangalore, Chennai, and beyond.",
  },
  {
    q: "How long does a typical stall installation take?",
    a: "Timelines depend on stall size and complexity, but our in-house production keeps most projects on a tight, predictable schedule.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#6E6E6E]/15 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-base font-semibold text-[#1A1A1A]">{q}</span>
        <span
          className={`text-xl text-[#F5821F] transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-[#6E6E6E] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#F5821F] uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">
            Clear Answers
          </h2>
        </Reveal>
        <Reveal>
          <div>
            {FAQS.map((f) => (
              <FAQItem key={f.q} {...f} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <TrustedBrands />
      <WhyUs />
      <Services />
      <Process />
      <Portfolio />
      <Stats />
      <Testimonials />
      <CTA />
      <FAQ />
    </main>
  );
}
