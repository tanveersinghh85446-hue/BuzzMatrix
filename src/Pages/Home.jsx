import React from "react";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl font-bold text-white mb-4">
            We Will Live <span className="text-orange-500">Soon</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-8">
            We're Building Something Amazing for You!{" "}
          </p>

          {/* Description */}
          <p className="text-gray-500 text-lg mb-12">
            This page is under construction. Please check back later.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
