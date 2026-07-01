import React from "react";

export default function About() {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-7xl font-bold text-white mb-4">
            We are Presenting Our Event's &{" "}
            <span className="text-orange-500"> Shedule Soon</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-8">
            We're Building Something Amazing for You!{" "}
          </p>

          {/* Description */}
          <p className="text-gray-500 text-lg mb-12">
            This page is under construction. Please check back later.{" "}
          </p>

          {/* Back Home Button */}
          <a
            href="/"
            className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Back To Home
          </a>
        </div>
      </div>
    </div>
  );
}
