import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";

// ─── Static data ──────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    href: "",
    icon: <FaFacebookF className="text-blue-600 text-lg md:text-xl" />,
    label: "Facebook",
  },
  {
    href: "",
    icon: <FaInstagramSquare className="text-pink-600 text-lg md:text-xl" />,
    label: "Instagram",
  },
  {
    href: "",
    icon: <FaYoutube className="text-red-600 text-lg md:text-xl" />,
    label: "YouTube",
  },
  {
    href: "",
    icon: <FaLinkedin className="text-blue-800 text-lg md:text-xl" />,
    label: "LinkedIn",
  },
  {
    href: "",
    icon: <FaXTwitter className="text-black text-lg md:text-xl" />,
    label: "X (Twitter)",
  },
  {
    href: "",
    icon: <IoIosMailUnread className="text-yellow-500 text-lg md:text-xl" />,
    label: "Email",
  },
  {
    href: "",
    icon: <BsWhatsapp className="text-green-600 text-lg md:text-xl" />,
    label: "WhatsApp",
  },
];

const LOCATIONS = [
  {
    name: "Delhi, India, Dwarka",
    link: "",
  },
  {
    name: "Banglore, India",
    link: "",
  },
  {
    name: "Gujrat, India",
    link: "",
  },
  {
    name: "Hyderabad, India",
    link: "",
  },
  {
    name: "Pune, India",
    link: "",
  },
  {
    name: "Capetown, South Africa",
    link: "",
  },
  {
    name: "London, United Kingdom",
    link: "",
  },
  {
    name: "Toronto, Canada",
    link: "",
  },
  {
    name: "New York, United States",
    link: "",
  },
  {
    name: "Paris, France",
    link: "",
  },
  {
    name: "Sydney, Australia",
    link: "",
  },
  {
    name: "Perth, Australia",
    link: "",
  },
  {
    name: "Adelaide, Australia",
    link: "",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SocialButton({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button
        aria-label={label}
        className="bg-white transition-transform duration-300 hover:scale-150 h-9 w-9 md:h-12 md:w-12 rounded-full flex items-center justify-center"
      >
        {icon}
      </button>
    </a>
  );
}

// ─── Main Footer Component ────────────────────────────────────────────────────

export default function Footer() {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      {/* ── FOOTER ── */}
      <hr  className="text-white"/>
      <div className="bg-gray-900 text-white px-6 md:px-12 lg:px-32 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="w-full lg:max-w-55 lg:shrink-0">
            <img
              className="h-20 w-20 object-contain mb-4 bg-white rounded-full"
              src="Logo.AVIF"
              sizes="175px"
              alt="Logo"
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm text-white leading-relaxed">
              Buzz Matrix India (BMI) is a professional exhibition, event, and
              interior solutions company committed to delivering innovative
              experiences.
            </p>
            <div className="flex justify-center items-center">
              <div className="mt-6">
                <h2 className="text-lg font-bold text-white mb-4">
                  Connect With Us!
                </h2>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map((s, i) => (
                    <SocialButton key={i} {...s} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:contents gap-8">
            <div className="lg:shrink-0">
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <div className="w-8 h-0.5 bg-blue-300 mb-3" />

              <ul className="flex flex-col space-y-1.5">
                {[
                  ["Home", "/"],
                  ["Contact", "/contact"],
                  ["Gallery", "/gallery"],
                  ["About", "/about"],
                  ["Visitors", "/visitors"],
                  ["Event's-Shedule", "/events-shedule"],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="flex items-center gap-2 text-sm text-white hover:text-black transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:shrink-0">
              <h3 className="text-lg font-bold mb-3">Contact Us</h3>
              <div className="w-8 h-0.5 bg-blue-300 mb-3" />
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-white">
                  <FaPhoneAlt className="text-blue-300 shrink-0" /> +91
                  {/* 9560307098 */}
                </p>
                <p className="flex items-center gap-2 text-sm text-white">
                  <FaEnvelope className="text-blue-300 shrink-0" />{" "}
                  {/* info@iioft.co.in */}
                </p>
                <p className="flex items-center gap-2 text-sm text-white">
                  <FaMapMarkerAlt className="text-blue-300 shrink-0" /> India,
                  Delhi Dwarka
                </p>
              </div>
              <motion.div
                className="mt-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Link to="contact">
                  <button className="w-full sm:w-auto px-6 py-2 border-2 border-white rounded-lg font-semibold text-sm hover:bg-white hover:text-blue-600 transition-all duration-300">
                    Contact Now →
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-56 lg:shrink-0">
            <img
              src="Logo.AVIF"
              sizes="(min-width: 1024px) 224px, 364px"
              alt="Global Presence Map"
              onClick={() => setShowMap(true)}
              loading="lazy"
              decoding="async"
              className="w-full lg:w-45 h-45 rounded-full shadow-lg opacity-90 hover:opacity-100 transition duration-300 cursor-pointer bg-white"
            />
          </div>

          {showMap && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <button
                onClick={() => setShowMap(false)}
                className="absolute top-5 right-5 text-white text-3xl font-bold"
              >
                ×
              </button>
              <img
                src="Logo.AVIF"
                alt="Map Full View"
                className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
