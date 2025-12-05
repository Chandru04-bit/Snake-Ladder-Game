// src/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 text-center text-sm border-t border-gray-200">
      &copy; {new Date().getFullYear()} Snake & Ladder Online. All rights reserved.
    </footer>
  );
}

