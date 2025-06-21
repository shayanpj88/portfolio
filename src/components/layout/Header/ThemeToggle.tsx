"use client";
import { useEffect, useState } from "react";
import { icons } from "@/lib/icons";

export default function ThemeToggle() {
  const SunIcon = icons["sun"];
  const MoonIcon = icons["moon"];
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex ">
      <div className="flex justify-end w-full">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mobile-button"
        >
          {darkMode ? (
            <MoonIcon className="button-icon" />
          ) : (
            <SunIcon className="button-icon" />
          )}
        </button>
      </div>
    </div>
  );
}
