"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/common/lib/hooks";
import SubmitBtn from "./_components/submit-btn";
import SectionHeading from "@/common/components/shared/section-heading";
import AISuggestion from "@/common/components/shared/ai-suggestion";
import toast from "react-hot-toast";
import { sendEmail } from "@/common/utils/actions/send-email";
import { useTheme } from 'next-themes';

export default function Contact() {
  const { ref } = useSectionInView("contact");
  const { theme } = useTheme();
  const [message, setMessage] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      opacity: [0, 0.7, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 5 + (i % 5),
        delay: i * 0.2,
        ease: "easeInOut",
      }
    })
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleApplySuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="relative flex w-full scroll-mt-12 flex-col items-center py-20 pb-44 text-center dark:bg-darkBg dark:text-white"
      initial={{ opacity: 0.8 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Background gradient circles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>
              <div className="absolute right-1/4 top-3/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl"></div>
              <div className="absolute right-1/3 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"></div>
              
              {/* Floating particles */}
              {particles.map((i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${
                    theme === 'light' ? 'bg-blue-400' : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${4 + (i % 8)}px`,
                    height: `${4 + (i % 8)}px`,
                    left: `${10 + (i * 5)}%`,
                    top: `${10 + ((i * 7) % 80)}%`,
                    opacity: 0.1,
                  }}
                  custom={i}
                  variants={particleVariants}
                  animate="animate"
                />
              ))}
            </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <motion.div variants={itemVariants}>
          <SectionHeading>Get In Touch</SectionHeading>
        </motion.div>

        <motion.div variants={itemVariants} className="w-[min(100%,38rem)] px-4">
          <p className="mb-12 mt-6 text-gray-700 dark:text-white/80">
            Please contact me directly at{" "}
            <a className="relative inline-block font-medium text-blue-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:text-blue-600 hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-cyan-400 dark:after:bg-cyan-400 dark:hover:text-cyan-300" href="mailto:shaikhsalif50@gmail.com">
              shaikhsalif50@gmail.com
            </a>{" "}
            or through this form.
          </p>

          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
            {/* Form side */}
            <motion.form
              className="w-full rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-gray-900/50 dark:text-white md:w-2/3"
              variants={itemVariants}
              action={async (formData) => {
                const { error } = await sendEmail(formData);

                if (error) {
                  toast.error(error);
                  return;
                }

                toast.success("Email sent successfully!");
                setMessage(""); // Clear the message after successful submission
              }}
            >
              <div className="mb-4">
                <label htmlFor="senderEmail" className="mb-2 block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 outline-none ring-blue-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500/20"
                  name="senderEmail"
                  id="senderEmail"
                  type="email"
                  required
                  maxLength={500}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="message" className="mb-2 block text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message
                </label>
                <textarea
                  className="h-52 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-4 outline-none ring-blue-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500/20"
                  name="message"
                  id="message"
                  placeholder="Hello! I'd like to discuss a project..."
                  required
                  maxLength={5000}
                  value={message}
                  onChange={handleMessageChange}
                />
              </div>
              
              {/* AI Suggestion Component */}
              <div className="mb-4 text-left">
                <AISuggestion 
                  message={message} 
                  onApplySuggestion={handleApplySuggestion} 
                />
              </div>
              
              <div className="flex justify-center">
                <SubmitBtn />
              </div>
            </motion.form>

            {/* Avatar/illustration side */}
            <motion.div
              variants={itemVariants}
              className="mt-10 hidden w-1/3 md:block"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="flex flex-col items-center justify-center"
              >
                <div className="relative h-40 w-40 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 p-1">
                  <div className="h-full w-full rounded-full bg-white p-2 dark:bg-gray-900">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-4xl dark:from-blue-900/50 dark:to-cyan-900/50">
                      <span className="font-bold text-blue-500 dark:text-cyan-400">S</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-center space-y-2">
                  <div className="h-2 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                  <div className="h-2 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70"></div>
                  <div className="h-2 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-40"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}