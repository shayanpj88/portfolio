"use client";
import { useState, useEffect } from "react";
import { icons } from "@/lib/icons";
import NavLinks from "../NavLinks/NavLinks";

export default function MobileMenu() {
  const CloseIcon = icons["close"];
  const MenuIcon = icons["menu"];
  // open mobile menu modal
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <>
      <div className=" flex md:hidden space-x-3 justify-end">
        <button
          onClick={() => setMobileMenuIsOpen(true)}
          className="mobile-button"
        >
          <MenuIcon className="button-icon" />
        </button>
      </div>

      {mobileMenuIsOpen && (
        <div
          onClick={() => setMobileMenuIsOpen(false)}
          className="flex fixed inset-0 bg-black/30 backdrop-blur-sm z-50 pt-6 justify-center items-start"
        >
          {/* Modal Box */}
          <div
            className="flex flex-col gap-6 w-11/12 backdrop-blur-sm p-8 justify-center rounded-3xl bg-white ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full">
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigations
              </h2>

              {/* Close Button */}
              <button
                className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                onClick={() => setMobileMenuIsOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="flex flex-col gap-4 divide-y  divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
              <NavLinks
                navMode="mobile"
                setMobileMenuIsOpen={setMobileMenuIsOpen}
              />
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
