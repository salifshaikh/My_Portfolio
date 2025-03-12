"use client";

import React from "react";
import { skillsData } from "@/common/lib/data";
import { useSectionInView } from "@/common/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/common/components/shared/section-heading";
import SectionDivider from "@/common/components/shared/section-divider";
import { useTheme } from 'next-themes';
import { FiChevronDown } from 'react-icons/fi';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("skills", 0.2);
  const { theme } = useTheme();

  // Enhanced animations
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  const floatingArrowVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 1, 0.3],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
        opacity: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }
      }
    }
  };

  // Background particles
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

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden scroll-mt-20 py-16 dark:bg-darkBg dark:text-white"
    >
      {/* The main container that needs the ref for intersection detection */}
      <div ref={ref} className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
      
      {/* Enhanced background effects */}
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

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
          className="mb-12"
        >
          <SectionHeading>My Skills</SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-gray-300">
            A showcase of technologies and frameworks I've mastered throughout my journey.
          </p>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="flex justify-center mb-8" 
          variants={floatingArrowVariants}
          animate="animate"
        >
          <FiChevronDown className="text-blue-500 dark:text-blue-400" size={28} />
        </motion.div>

        <ul className="my-16 flex max-w-[53rem] flex-wrap items-center justify-center gap-3 mx-auto">
          {skillsData.map((skill, index) => (
            <motion.li
              className="borderBlack flex items-center justify-center rounded-xl bg-gray-200 px-5 py-3 dark:bg-white/10 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={index}
            >
              <Image
                src={skill[1]}
                alt={skill[0]}
                width={24}
                height={24}
                className="mr-2 inline h-6 w-6"
              />
              {skill[0]}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex w-full justify-center dark:bg-darkBg">
        <SectionDivider />
      </div>
    </section>
  );
}