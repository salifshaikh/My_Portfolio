"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  const [isPending, setIsPending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Reset isPending state when the form submission completes
  useEffect(() => {
    if (formSubmitted && !pending) {
      setIsPending(false);
      setFormSubmitted(false);
    }
  }, [pending, formSubmitted]);

  // Set up event listeners for the form submission
  useEffect(() => {
    const form = document.querySelector("form");
    if (!form) return;

    const handleSubmit = () => {
      setIsPending(true);
      setFormSubmitted(true);
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-12 items-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-white transition-all hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-cyan-500 dark:hover:from-blue-700 dark:hover:to-cyan-600"
      type="submit"
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center">
          <svg
            className="mr-2 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Sending...
        </div>
      ) : (
        <>
          Send Message
          <span className="absolute right-0 -translate-y-1/2 translate-x-1/4 top-1/2 h-32 w-8 bg-white/20 blur-md transition-all duration-1000 group-hover:-translate-x-full"></span>
        </>
      )}
    </motion.button>
  );
}